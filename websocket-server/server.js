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
const MOODLE_URL = process.env.MOODLE_URL || 'http://moodle:80';

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
  // Get session to use instance ID
  const session = sessions.get(sessionId);
  const instanceId = session?.instanceId || sessionId;
  
  console.log('=== UPDATE LEADERBOARD ===');
  console.log(`sessionId: ${sessionId}, instanceId: ${instanceId}, userId: ${userId}, score: ${score}`);
  
  const key = `session:${instanceId}:leaderboard`;
  console.log(`Redis key being used: ${key}`);
  
  await redisClient.zIncrBy(key, score, userId.toString());
  
  // Get ALL users from leaderboard (not just top 10)
  const top = await redisClient.zRangeWithScores(key, 0, -1, { REV: true });
  
  console.log(`updateLeaderboard: sessionId=${sessionId}, userId=${userId}, score=${score}`);
  console.log(`Redis leaderboard data (ALL users):`, top);
  console.log(`Session users:`, session ? Array.from(session.users.entries()) : 'No session');
  
  const leaderboard = top.map(item => {
    const userId = parseInt(item.value);
    let username = `User ${userId}`;
    
    // Try to get username from session users
    if (session && session.users) {
      const user = session.users.get(userId);
      if (user && user.username) {
        username = user.username;
        console.log(`Found username for user ${userId}: ${username}`);
      } else {
        console.log(`No username found for user ${userId}, using default`);
      }
    }
    
    return {
      userId: userId,
      username: username,
      score: Math.round(item.score)
    };
  });
  
  console.log(`Final leaderboard being returned:`, leaderboard);
  return leaderboard;
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
  console.log(`User connected: ${socket.userId} (${socket.role}) "${socket.username}" in session ${socket.sessionId}`);
  
  const session = await getSession(socket.sessionId);
  const room = `session:${socket.sessionId}`;
  
  // Join room
  socket.join(room);
  
  // Register user in session
  if (socket.role === 'teacher') {
    session.teacher = socket.id;
    console.log(`Teacher registered: ${socket.userId} "${socket.username}"`);
  } else {
    session.students.add(socket.id);
    await redisClient.sAdd(`session:${socket.sessionId}:students`, socket.userId.toString());
    console.log(`Student registered: ${socket.userId} "${socket.username}"`);
  }
  
  // Store user info in session (ensure numeric key for consistency)
  const numericUserId = parseInt(socket.userId);
  session.users.set(numericUserId, {
    id: numericUserId,
    username: socket.username,
    role: socket.role
  });
  
  console.log(`Session users now:`, Array.from(session.users.entries()));
  
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
    
    // Use instance ID from client or generate one
    const sessionInstanceId = data.instance_id || `${socket.sessionId}_${Date.now()}`;
    session.instanceId = sessionInstanceId;
    session.quizId = data.quizId; // Store quiz ID for database saves
    session.started = true;
    session.startedAt = Date.now();
    session.questions = data.questions || [];
    
    // Clear any existing leaderboard data for fresh start (reset scores)
    const leaderboardKey = `session:${sessionInstanceId}:leaderboard`;
    const answersKey = `session:${sessionInstanceId}:answers`;
    const studentsKey = `session:${sessionInstanceId}:students`;
    
    console.log('=== CREATING NEW SESSION ===');
    console.log(`New instanceId: ${sessionInstanceId}`);
    console.log(`Deleting Redis keys: ${leaderboardKey}, ${answersKey}, ${studentsKey}`);
    
    await redisClient.del(leaderboardKey);
    await redisClient.del(answersKey);
    await redisClient.del(studentsKey);
    
    // Verify deletion
    const checkScore = await redisClient.zRangeWithScores(leaderboardKey, 0, -1);
    console.log(`After deletion, leaderboard contents: ${JSON.stringify(checkScore)}`);
    
    // Clear session users map to reset usernames
    session.users.clear();
    // Re-add teacher
    const numericUserId = parseInt(socket.userId);
    session.users.set(numericUserId, {
      id: numericUserId,
      username: socket.username,
      role: socket.role
    });
    
    console.log(`Created new session instance: ${sessionInstanceId} - ALL scores reset to 0`);
    console.log(`Session questions: ${session.questions.length}`);
    
    // Reset session data
    session.questionResponses = [];
    session.currentQuestion = null;
    session.questionNumber = 0;
    
    io.to(room).emit('session:created', {
      sessionId: socket.sessionId,
      instanceId: sessionInstanceId,
      teacherId: socket.userId
    });
    
    // Notify all students that a new session has started
    io.to(room).emit('session:reset', {
      instanceId: sessionInstanceId,
      message: 'New session started - scores reset'
    });
  });
  
  // Debug: Add test users to leaderboard (for testing purposes)
  socket.on('debug:populate_leaderboard', async () => {
    if (socket.role !== 'teacher') return;
    
    const key = `session:${socket.sessionId}:leaderboard`;
    
    // Add some test users
    await redisClient.zAdd(key, { score: 150, value: '1' });
    await redisClient.zAdd(key, { score: 200, value: '2' });
    await redisClient.zAdd(key, { score: 100, value: '3' });
    
    // Add test users to session
    session.users.set(1, { id: 1, username: 'Alice Johnson', role: 'student' });
    session.users.set(2, { id: 2, username: 'Bob Smith', role: 'student' });
    session.users.set(3, { id: 3, username: 'Charlie Brown', role: 'student' });
    
    console.log('Added test users to leaderboard');
    
    // Send updated leaderboard
    const leaderboard = await updateLeaderboard(socket.sessionId, socket.userId, 0);
    io.to(room).emit('leaderboard:update', { leaderboard });
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
    
    // Clear any existing timer
    if (session.timerInterval) {
      clearInterval(session.timerInterval);
    }
    
    // Start timer countdown
    let remaining = timer;
    session.timerInterval = setInterval(() => {
      remaining--;
      io.to(room).emit('timer:update', { remaining });
      
      if (remaining <= 0) {
        clearInterval(session.timerInterval);
        session.timerInterval = null;
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
    
    console.log(`Student ${socket.userId} "${socket.username}" submitted answer ${answerIndex}, timeSpent=${timeSpent}s`);
    
    // Calculate score: 400 base for correct, + (remaining seconds * 20) as speed bonus
    const isCorrect = answerIndex === currentQuestion.correct_index;
    const timerDuration = session.timer || 60;
    const remainingSeconds = Math.max(0, timerDuration - (timeSpent || 0));
    const baseScore = isCorrect ? 400 : 0;
    const speedBonus = isCorrect ? Math.round(remainingSeconds * 20) : 0;
    const questionScore = baseScore + speedBonus;
    
    console.log(`Score calculation: correct=${isCorrect}, base=${baseScore}, remainingSec=${remainingSeconds}, speedBonus=${speedBonus}, total=${questionScore}`);
    
    // Use instanceId for session-specific scores
    const instanceId = session.instanceId || socket.sessionId;
    
    // Get current total score
    const currentScore = await redisClient.zScore(
      `session:${instanceId}:leaderboard`,
      socket.userId.toString()
    ) || 0;
    const totalScore = currentScore + questionScore;
    
    console.log(`User ${socket.userId} score: current=${currentScore}, new total=${totalScore}, instanceId=${instanceId}`);
    
    // Update leaderboard
    const leaderboard = await updateLeaderboard(socket.sessionId, socket.userId, questionScore);
    console.log(`Updated leaderboard:`, leaderboard);
    
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
      `session:${instanceId}:answers`,
      JSON.stringify(answerData)
    );
    
    // Add to session responses for question results
    if (session.questionResponses) {
      session.questionResponses.push({
        userId: parseInt(socket.userId),
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
    console.log(`Broadcasting leaderboard update to room ${room}:`, leaderboard);
    io.to(room).emit('leaderboard:update', {
      leaderboard: leaderboard,
      questionId: questionId
    });
    
    // Also emit to teacher to save to Moodle database
    io.to(room).emit('response:save', {
      sessionId: instanceId,
      quizId: session.quizId,
      userId: parseInt(socket.userId),
      username: socket.username || `User ${socket.userId}`,
      questionId: questionId,
      questionText: currentQuestion.question || currentQuestion.text,
      answerIndex: answerIndex,
      isCorrect: isCorrect,
      score: questionScore,
      totalScore: totalScore,
      timeSpent: timeSpent
    });
  });
  
  // Teacher: End session
  socket.on('teacher:end_session', async () => {
    if (socket.role !== 'teacher') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    const instanceId = session.instanceId || socket.sessionId;
    
    const leaderboard = await redisClient.zRangeWithScores(
      `session:${instanceId}:leaderboard`,
      0,
      -1,
      { REV: true }
    );
    
    // Get usernames for leaderboard
    const finalLeaderboard = await Promise.all(leaderboard.map(async (item) => {
      const userId = parseInt(item.value);
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
    
    // Save session results to database (emit to Moodle for storage)
    const sessionData = {
      sessionId: socket.sessionId,
      instanceId: instanceId,
      teacherId: socket.userId,
      participantsCount: finalLeaderboard.length,
      finalLeaderboard: finalLeaderboard,
      startedAt: session.startedAt ? Math.floor(session.startedAt / 1000) : null,
      endedAt: Math.floor(Date.now() / 1000)
    };
    
    console.log('Session ended, saving results:', sessionData);
    
    io.to(room).emit('session:ended', {
      finalLeaderboard: finalLeaderboard,
      sessionData: sessionData
    });
    
    // Emit final leaderboard
    io.to(room).emit('leaderboard:final', {
      leaderboard: finalLeaderboard
    });
    
    // Cleanup
    session.started = false;
    session.currentQuestion = null;
    
    // Clear timer if running
    if (session.timerInterval) {
      clearInterval(session.timerInterval);
      session.timerInterval = null;
    }
  });
  
  // Get current leaderboard
  socket.on('leaderboard:get', async () => {
    console.log(`Manual leaderboard request from user ${socket.userId}`);
    
    // Get all users from Redis leaderboard
    const key = `session:${socket.sessionId}:leaderboard`;
    const allUsers = await redisClient.zRangeWithScores(key, 0, -1, { REV: true });
    
    console.log(`All users in Redis leaderboard:`, allUsers);
    
    // Get session to fetch usernames
    const session = sessions.get(socket.sessionId);
    console.log(`Session users for leaderboard:`, session ? Array.from(session.users.entries()) : 'No session');
    
    const leaderboard = allUsers.map(item => {
      const userId = parseInt(item.value);
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
    });
    
    console.log(`Sending leaderboard:`, leaderboard);
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

