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
 * Get username for a user ID from Redis or session
 */
async function getUsername(instanceId, userId, session = null) {
  const usernamesKey = `session:${instanceId}:usernames`;
  const usernames = await redisClient.hGetAll(usernamesKey);
  
  if (usernames[userId]) {
    return usernames[userId];
  }
  
  if (session?.users) {
    const user = session.users.get(parseInt(userId));
    if (user?.username) {
      return user.username;
    }
  }
  
  return `User ${userId}`;
}

/**
 * Build leaderboard array from Redis scores
 */
async function buildLeaderboard(instanceId, session = null) {
  const leaderboardKey = `session:${instanceId}:leaderboard`;
  const top = await redisClient.zRangeWithScores(leaderboardKey, 0, -1, { REV: true });
  
  const leaderboard = await Promise.all(top.map(async (item) => {
    const userId = parseInt(item.value);
    const username = await getUsername(instanceId, userId.toString(), session);
    
    return {
      userId,
      user_id: userId,
      userid: userId,
      id: userId,
      username,
      score: Math.round(item.score)
    };
  }));
  
  return leaderboard;
}

/**
 * Store username in Redis
 */
async function storeUsername(instanceId, userId, username) {
  if (username?.trim() && username !== `User ${userId}`) {
    const usernamesKey = `session:${instanceId}:usernames`;
    await redisClient.hSet(usernamesKey, userId.toString(), username);
  }
}

/**
 * Update leaderboard in Redis
 */
async function updateLeaderboard(sessionId, visitorUserId, score, visitorUsername = null) {
  const session = sessions.get(sessionId);
  const instanceId = session?.instanceId || sessionId;
  
  const leaderboardKey = `session:${instanceId}:leaderboard`;
  await redisClient.zIncrBy(leaderboardKey, score, visitorUserId.toString());
  
  if (visitorUsername) {
    await storeUsername(instanceId, visitorUserId, visitorUsername);
  }
  
  return await buildLeaderboard(instanceId, session);
}

/**
 * Calculate score for an answer
 */
function calculateScore(isCorrect, timerDuration, timeSpent) {
  if (!isCorrect) return 0;
  const remainingSeconds = Math.max(0, timerDuration - (timeSpent || 0));
  return 400 + Math.round(remainingSeconds * 20);
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
    return next(new Error('Authentication error: No token provided'));
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return next(new Error('Authentication error: Invalid token'));
  }
  
  const { user_id, role, session_id, username } = decoded;
  socket.userId = user_id;
  socket.role = role;
  socket.sessionId = session_id;
  socket.username = username?.trim() || `User ${user_id}`;
  
  next();
});

io.on('connection', async (socket) => {
  // Log all incoming events for debugging (optional)
  if (process.env.DEBUG === 'true') {
    socket.onAny((eventName, ...args) => {
      console.log(`[EVENT] ${socket.userId} (${socket.role}): ${eventName}`, JSON.stringify(args).substring(0, 200));
    });
  }
  
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
  const numericUserId = parseInt(socket.userId);
  session.users.set(numericUserId, {
    id: numericUserId,
    username: socket.username,
    role: socket.role
  });

  // Store username in Redis for leaderboard
  const instanceId = session.instanceId || socket.sessionId;
  await storeUsername(instanceId, numericUserId, socket.username);
  
  // Emit session joined (include instanceId if available)
  socket.emit('session:joined', {
    sessionId: socket.sessionId,
    instanceId: instanceId, // Include instanceId so students can join with correct session_id
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
    
    // Clear all Redis keys for fresh start
    const keysToDelete = [
      `session:${sessionInstanceId}:leaderboard`,
      `session:${sessionInstanceId}:answers`,
      `session:${sessionInstanceId}:students`,
      `session:${sessionInstanceId}:usernames`,
      `session:${socket.sessionId}:leaderboard`, // Old session keys
      `session:${socket.sessionId}:usernames`
    ];
    
    await Promise.all(keysToDelete.map(key => redisClient.del(key)));
    
    // Reset session
    session.users.clear();
    session.users.set(parseInt(socket.userId), {
      id: parseInt(socket.userId),
      username: socket.username,
      role: socket.role
    });
    session.questionResponses = [];
    session.currentQuestion = null;
    session.questionNumber = 0;
    
    // Emit empty leaderboard to clear any old data on clients
    io.to(room).emit('leaderboard:update', {
      leaderboard: []
    });
    
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
    
    // Broadcast to all students; timer starts automatically
    io.to(room).emit('question:new', {
      question,
      timer,
      questionNumber: data.questionNumber || 1
    });
    
    // Clear any existing timer and start countdown
    if (session.timerInterval) {
      clearInterval(session.timerInterval);
      session.timerInterval = null;
    }
    let remaining = timer;
    session.timerInterval = setInterval(async () => {
      remaining--;
      io.to(room).emit('timer:update', { remaining });
      
      if (remaining <= 0) {
        clearInterval(session.timerInterval);
        session.timerInterval = null;
        io.to(room).emit('question:timeout');
        
        const responses = session.questionResponses || [];
        const instanceId = session.instanceId || socket.sessionId;
        const leaderboard = await buildLeaderboard(instanceId, session);
        
        io.to(room).emit('question:results', {
          questionNumber: session.questionNumber,
          responses,
          correctCount: responses.filter(r => r.isCorrect).length,
          totalCount: responses.length,
          leaderboard,
          question: session.currentQuestion
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
    
    const { questionId, answerIndex, timeSpent, fullName } = data;
    const currentQuestion = session.currentQuestion;
    
    // Update username if provided
    if (fullName && fullName !== 'Unknown') {
      socket.username = fullName;
      const numericUserId = parseInt(socket.userId);
      const user = session.users.get(numericUserId) || { id: numericUserId, role: 'student' };
      user.username = fullName;
      session.users.set(numericUserId, user);
      
      const instanceId = session.instanceId || socket.sessionId;
      await storeUsername(instanceId, numericUserId, fullName);
    }
    
    if (!currentQuestion || currentQuestion.id !== questionId) {
      socket.emit('error', { message: 'Invalid question' });
      return;
    }
    
    // Calculate score
    const isCorrect = parseInt(answerIndex) === parseInt(currentQuestion.correct_index);
    const timerDuration = session.timer || 60;
    const questionScore = calculateScore(isCorrect, timerDuration, timeSpent);
    
    // Update leaderboard
    const instanceId = session.instanceId || socket.sessionId;
    const currentScore = await redisClient.zScore(
      `session:${instanceId}:leaderboard`,
      socket.userId.toString()
    ) || 0;
    const totalScore = currentScore + questionScore;
    const leaderboard = await updateLeaderboard(socket.sessionId, socket.userId, questionScore, socket.username);
    
    // Store answer in Redis
    await redisClient.lPush(
      `session:${instanceId}:answers`,
      JSON.stringify({
        userId: socket.userId,
        questionId,
        answerIndex,
        isCorrect,
        questionScore,
        totalScore,
        timestamp: Date.now()
      })
    );
    
    // Add to session responses
    session.questionResponses.push({
      userId: parseInt(socket.userId),
      username: socket.username || `User ${socket.userId}`,
      answerIndex,
      isCorrect,
      questionScore,
      totalScore
    });
    
    // Emit results
    socket.emit('answer:result', {
      isCorrect,
      questionScore,
      totalScore,
      correctAnswer: currentQuestion.correct_index
    });
    
    io.to(room).emit('leaderboard:update', { leaderboard, questionId });
    
    io.to(room).emit('response:save', {
      sessionId: instanceId,
      quizId: session.quizId,
      userId: parseInt(socket.userId),
      username: socket.username || `User ${socket.userId}`,
      questionId,
      questionText: currentQuestion.question || currentQuestion.text,
      answerIndex,
      isCorrect,
      score: questionScore,
      totalScore,
      timeSpent
    });
  });
  
  // Teacher: End session
  socket.on('teacher:end_session', async () => {
    if (socket.role !== 'teacher') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    const instanceId = session.instanceId || socket.sessionId;
    const finalLeaderboard = await buildLeaderboard(instanceId, session);
    
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
    
    io.to(room).emit('session:ended', {
      finalLeaderboard,
      sessionData
    });
    
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
    const session = sessions.get(socket.sessionId);
    const instanceId = session?.instanceId || socket.sessionId;
    const leaderboard = await buildLeaderboard(instanceId, session);
    socket.emit('leaderboard:update', { leaderboard });
  });
  
  // Teacher: Sync scores from database to Redis
  socket.on('teacher:sync_scores', async (data) => {
    if (socket.role !== 'teacher') {
      socket.emit('error', { message: 'Unauthorized' });
      return;
    }
    
    const instanceId = data.sessionId;
    const leaderboard = data.leaderboard || [];
    
    // Clear existing Redis leaderboard
    const leaderboardKey = `session:${instanceId}:leaderboard`;
    await redisClient.del(leaderboardKey);
    
    // Populate Redis with scores from database
    for (const entry of leaderboard) {
      const userId = entry.userId || entry.user_id || entry.userid || entry.id;
      const score = entry.score || 0;
      const username = entry.username || `User ${userId}`;
      
      if (userId) {
        await redisClient.zAdd(leaderboardKey, {
          score: score,
          value: userId.toString()
        });
        
        // Store username
        await storeUsername(instanceId, userId, username);
      }
    }
    
    console.log(`Synced ${leaderboard.length} scores from database to Redis for session ${instanceId}`);
    
    // Emit updated leaderboard
    const updatedLeaderboard = await buildLeaderboard(instanceId, session);
    io.to(`session:${socket.sessionId}`).emit('leaderboard:update', {
      leaderboard: updatedLeaderboard
    });
  });
  
  // Disconnect handling
  socket.on('disconnect', async () => {
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

