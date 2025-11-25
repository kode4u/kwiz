/**
 * WebSocket Server for Real-time Quiz Communication
 * Handles teacher-student interactions, leaderboards, and session management
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Configuration
const PORT = process.env.PORT || 3001;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:8080';

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling']
});

// Redis client
const redisClient = redis.createClient({ url: REDIS_URL });

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected'));

// Connect to Redis
redisClient.connect().catch(console.error);

// Session storage (in-memory, can be moved to Redis)
const sessions = new Map();

/**
 * Verify JWT token
 */
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error('JWT verification error:', err.message);
    console.error('Token (first 50 chars):', token ? token.substring(0, 50) : 'null');
    console.error('JWT_SECRET (first 20 chars):', JWT_SECRET ? JWT_SECRET.substring(0, 20) : 'null');
    return null;
  }
}

/**
 * Get or create session
 */
async function getSession(sessionId) {
  if (sessions.has(sessionId)) {
    return sessions.get(sessionId);
  }
  
  const session = {
    id: sessionId,
    teacher: null,
    students: new Set(),
    users: new Map(), // Store user info including usernames
    currentQuestion: null,
    leaderboard: new Map(),
    timer: null,
    started: false
  };
  
  sessions.set(sessionId, session);
  return session;
}

/**
 * Update leaderboard in Redis
 */
async function updateLeaderboard(sessionId, userId, score) {
  const key = `session:${sessionId}:leaderboard`;
  await redisClient.zIncrBy(key, score, userId.toString());
  
  // Get top 10
  const top = await redisClient.zRangeWithScores(key, 0, 9, { REV: true });
  
  // Get session to fetch usernames
  const session = sessions.get(sessionId);
  
  return top.map(item => {
    const userId = parseInt(item.value);
    let username = `User ${userId}`;
    
    // Try to get username from session users
    if (session && session.users) {
      const user = session.users.get(userId);
      if (user && user.username) {
        username = user.username;
      }
    }
    
    return {
      userId: userId,
      username: username,
      score: Math.round(item.score)
    };
  });
}

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'websocket-server' });
});

/**
 * Socket.IO connection handling
 */
io.use((socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    console.error('No token provided in handshake');
    return next(new Error('Authentication error: No token provided'));
  }
  
  console.log('Verifying token, JWT_SECRET length:', JWT_SECRET ? JWT_SECRET.length : 0);
  const decoded = verifyToken(token);
  if (!decoded) {
    console.error('Token verification failed');
    return next(new Error('Authentication error: Invalid token'));
  }
  
  console.log('Token verified successfully:', { userId: decoded.user_id, role: decoded.role, sessionId: decoded.session_id, username: decoded.username });
  socket.userId = decoded.user_id;
  socket.role = decoded.role;
  socket.sessionId = decoded.session_id;
  socket.username = decoded.username || `User ${decoded.user_id}`;
  
  next();
});

io.on('connection', async (socket) => {
  console.log(`User connected: ${socket.userId} (${socket.role}) in session ${socket.sessionId}`);
  
  const session = await getSession(socket.sessionId);
  const room = `session:${socket.sessionId}`;
  
  // Join room
  socket.join(room);
  
  // Register user in session
  if (socket.role === 'teacher') {
    session.teacher = socket.id;
  } else {
    session.students.add(socket.id);
    await redisClient.sAdd(`session:${socket.sessionId}:students`, socket.userId.toString());
  }
  
  // Store user info in session
  session.users.set(socket.userId, {
    id: socket.userId,
    username: socket.username,
    role: socket.role
  });
  
  // Emit session joined
  socket.emit('session:joined', {
    sessionId: socket.sessionId,
    role: socket.role
  });
  
  // Teacher: Create session
  socket.on('teacher:create_session', async (data) => {
    if (socket.role !== 'teacher') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    session.started = false;
    io.to(room).emit('session:created', {
      sessionId: socket.sessionId,
      teacherId: socket.userId
    });
  });
  
  // Teacher: Push question
  socket.on('teacher:push_question', async (data) => {
    if (socket.role !== 'teacher') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    const question = data.question;
    const timer = data.timer || 60; // seconds
    
    session.currentQuestion = question;
    session.timer = timer;
    session.started = true;
    session.questionResponses = [];
    session.questionNumber = data.questionNumber || 1;
    
    // Store in Redis
    await redisClient.setEx(
      `session:${socket.sessionId}:current_question`,
      3600,
      JSON.stringify(question)
    );
    
    // Broadcast to all students
    io.to(room).emit('question:new', {
      question: question,
      timer: timer,
      questionNumber: data.questionNumber || 1
    });
    
    // Start timer countdown
    let remaining = timer;
    const timerInterval = setInterval(() => {
      remaining--;
      io.to(room).emit('timer:update', { remaining });
      
      if (remaining <= 0) {
        clearInterval(timerInterval);
        io.to(room).emit('question:timeout');
        
        // Send question results to teacher after timeout (immediately)
        const responses = session.questionResponses || [];
        io.to(room).emit('question:results', {
          questionNumber: session.questionNumber,
          responses: responses,
          correctCount: responses.filter(r => r.isCorrect).length,
          totalCount: responses.length
        });
      }
    }, 1000);
  });
  
  // Student: Submit answer
  socket.on('student:submit_answer', async (data) => {
    if (socket.role !== 'student') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    const { questionId, answerIndex, timeSpent } = data;
    const currentQuestion = session.currentQuestion;
    
    if (!currentQuestion || currentQuestion.id !== questionId) {
      socket.emit('error', { message: 'Invalid question' });
      return;
    }
    
    // Calculate score
    const isCorrect = answerIndex === currentQuestion.correct_index;
    const baseScore = isCorrect ? 100 : 0;
    const timeBonus = timeSpent < 10 ? Math.max(0, 50 - timeSpent * 5) : 0;
    const questionScore = baseScore + timeBonus;
    
    // Get current total score
    const currentScore = await redisClient.zScore(
      `session:${socket.sessionId}:leaderboard`,
      socket.userId.toString()
    ) || 0;
    const totalScore = currentScore + questionScore;
    
    // Update leaderboard
    const leaderboard = await updateLeaderboard(socket.sessionId, socket.userId, questionScore);
    
    // Store answer
    const answerData = {
      userId: socket.userId,
      questionId,
      answerIndex,
      isCorrect,
      questionScore,
      totalScore,
      timestamp: Date.now()
    };
    
    await redisClient.lPush(
      `session:${socket.sessionId}:answers`,
      JSON.stringify(answerData)
    );
    
    // Add to session responses for question results
    if (session.questionResponses) {
      session.questionResponses.push({
        userId: socket.userId,
        username: socket.username || `User ${socket.userId}`,
        answerIndex: answerIndex,
        isCorrect,
        questionScore,
        totalScore
      });
    }
    
    // Emit result to student with total score
    socket.emit('answer:result', {
      isCorrect,
      questionScore,
      totalScore,
      correctAnswer: currentQuestion.correct_index
    });
    
    // Broadcast updated leaderboard
    io.to(room).emit('leaderboard:update', {
      leaderboard: leaderboard,
      questionId: questionId
    });
  });
  
  // Teacher: End session
  socket.on('teacher:end_session', async () => {
    if (socket.role !== 'teacher') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    const leaderboard = await redisClient.zRangeWithScores(
      `session:${socket.sessionId}:leaderboard`,
      0,
      -1,
      { REV: true }
    );
    
    // Get usernames for leaderboard
    const finalLeaderboard = await Promise.all(leaderboard.map(async (item) => {
      const userId = parseInt(item.value);
      // Try to get username from session or use default
      const session = sessions.get(socket.sessionId);
      let username = `User ${userId}`;
      if (session && session.users) {
        const user = session.users.get(userId);
        if (user && user.username) {
          username = user.username;
        }
      }
      return {
        userId: userId,
        username: username,
        score: Math.round(item.score)
      };
    }));
    
    io.to(room).emit('session:ended', {
      finalLeaderboard: finalLeaderboard
    });
    
    // Emit final leaderboard
    io.to(room).emit('leaderboard:final', {
      leaderboard: finalLeaderboard
    });
    
    // Cleanup
    session.started = false;
    session.currentQuestion = null;
  });
  
  // Get current leaderboard
  socket.on('leaderboard:get', async () => {
    const leaderboard = await updateLeaderboard(socket.sessionId, socket.userId, 0);
    socket.emit('leaderboard:update', { leaderboard });
  });
  
  // Disconnect handling
  socket.on('disconnect', async () => {
    console.log(`User disconnected: ${socket.userId}`);
    
    if (socket.role === 'teacher') {
      session.teacher = null;
    } else {
      session.students.delete(socket.id);
      await redisClient.sRem(`session:${socket.sessionId}:students`, socket.userId.toString());
    }
    
    // Cleanup if no users
    if (!session.teacher && session.students.size === 0) {
      sessions.delete(socket.sessionId);
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`CORS origin: ${CORS_ORIGIN}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await redisClient.quit();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

