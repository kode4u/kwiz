/**
 * Gamified Quiz Frontend Application
 * Handles WebSocket connection and UI interactions
 */

(function() {
    'use strict';

    const config = window.GAMIFIED_QUIZ_CONFIG;
    if (!config) {
        console.error('Gamified Quiz config not found');
        return;
    }

    // Initialize Socket.IO connection
    const socket = io(config.wsUrl, {
        auth: {
            token: config.jwtToken
        },
        transports: ['websocket', 'polling']
    });

    // Connection handlers
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    // Initialize app based on role
    if (config.role === 'teacher') {
        initTeacherApp();
    } else {
        initStudentApp();
    }

    /**
     * Teacher Application
     */
    function initTeacherApp() {
        const container = document.getElementById('gamifiedquiz-teacher-app');
        if (!container) return;

        container.innerHTML = `
            <div class="gamifiedquiz-teacher">
                <div class="controls">
                    <button id="generate-questions-btn" class="btn btn-primary">Generate Questions</button>
                    <button id="start-session-btn" class="btn btn-success" disabled>Start Session</button>
                    <button id="end-session-btn" class="btn btn-danger" disabled>End Session</button>
                </div>
                <div id="questions-container" class="questions-container"></div>
                <div id="session-status" class="session-status"></div>
            </div>
        `;

        let questions = [];
        let currentQuestionIndex = 0;

        // Generate questions
        document.getElementById('generate-questions-btn').addEventListener('click', async () => {
            const response = await fetch('/mod/gamifiedquiz/ajax/generate.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quizid: config.quizId,
                    topic: 'Default Topic' // Get from config
                })
            });
            const data = await response.json();
            if (data.success) {
                questions = data.questions;
                displayQuestions(questions);
                document.getElementById('start-session-btn').disabled = false;
            }
        });

        // Start session
        document.getElementById('start-session-btn').addEventListener('click', () => {
            socket.emit('teacher:create_session', {});
            document.getElementById('start-session-btn').disabled = true;
            document.getElementById('end-session-btn').disabled = false;
            currentQuestionIndex = 0;
            pushNextQuestion();
        });

        // End session
        document.getElementById('end-session-btn').addEventListener('click', () => {
            socket.emit('teacher:end_session');
        });

        // Push question
        function pushNextQuestion() {
            if (currentQuestionIndex >= questions.length) {
                alert('No more questions');
                return;
            }

            const question = questions[currentQuestionIndex];
            socket.emit('teacher:push_question', {
                question: {
                    id: 'q' + (currentQuestionIndex + 1),
                    text: question.question,
                    choices: question.choices.map(c => c.text),
                    correct_index: question.correct_index
                },
                timer: 60,
                questionNumber: currentQuestionIndex + 1
            });
            currentQuestionIndex++;
        }

        // Display questions
        function displayQuestions(qs) {
            const container = document.getElementById('questions-container');
            container.innerHTML = qs.map((q, i) => `
                <div class="question-preview">
                    <h4>Question ${i + 1}</h4>
                    <p>${q.question}</p>
                    <ul>
                        ${q.choices.map((c, idx) => `
                            <li class="${c.is_correct ? 'correct' : ''}">${c.text}</li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');
        }

        // Listen for session events
        socket.on('session:created', (data) => {
            document.getElementById('session-status').textContent = 'Session active';
        });

        socket.on('session:ended', (data) => {
            document.getElementById('session-status').textContent = 'Session ended';
            document.getElementById('end-session-btn').disabled = true;
        });
    }

    /**
     * Student Application
     */
    function initStudentApp() {
        const container = document.getElementById('gamifiedquiz-student-app');
        if (!container) return;

        container.innerHTML = `
            <div class="gamifiedquiz-student">
                <div id="waiting-message" class="waiting">Waiting for question...</div>
                <div id="question-container" class="question-container" style="display:none;">
                    <div id="question-text" class="question-text"></div>
                    <div id="timer" class="timer"></div>
                    <div id="choices" class="choices"></div>
                    <button id="submit-btn" class="btn btn-primary" disabled>Submit Answer</button>
                </div>
                <div id="result-container" class="result-container" style="display:none;"></div>
                <div id="leaderboard-container" class="leaderboard-container"></div>
            </div>
        `;

        let currentQuestion = null;
        let selectedAnswer = null;
        let timerInterval = null;

        // Listen for new questions
        socket.on('question:new', (data) => {
            currentQuestion = data.question;
            selectedAnswer = null;
            displayQuestion(data.question, data.timer);
            document.getElementById('waiting-message').style.display = 'none';
            document.getElementById('question-container').style.display = 'block';
            document.getElementById('result-container').style.display = 'none';
        });

        // Display question
        function displayQuestion(question, timer) {
            document.getElementById('question-text').textContent = question.text;
            
            const choicesContainer = document.getElementById('choices');
            choicesContainer.innerHTML = question.choices.map((choice, index) => `
                <label class="choice-option">
                    <input type="radio" name="answer" value="${index}">
                    ${choice}
                </label>
            `).join('');

            // Handle choice selection
            choicesContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    selectedAnswer = parseInt(e.target.value);
                    document.getElementById('submit-btn').disabled = false;
                });
            });

            // Start timer
            let remaining = timer;
            document.getElementById('timer').textContent = `Time: ${remaining}s`;
            
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                remaining--;
                document.getElementById('timer').textContent = `Time: ${remaining}s`;
                if (remaining <= 0) {
                    clearInterval(timerInterval);
                    submitAnswer();
                }
            }, 1000);
        }

        // Submit answer
        function submitAnswer() {
            if (selectedAnswer === null) {
                selectedAnswer = -1; // No answer selected
            }

            socket.emit('student:submit_answer', {
                questionId: currentQuestion.id,
                answerIndex: selectedAnswer,
                timeSpent: 60 - parseInt(document.getElementById('timer').textContent.match(/\d+/)[0])
            });

            document.getElementById('submit-btn').disabled = true;
        }

        document.getElementById('submit-btn').addEventListener('click', submitAnswer);

        // Listen for answer result
        socket.on('answer:result', (data) => {
            document.getElementById('question-container').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
            document.getElementById('result-container').innerHTML = `
                <div class="result ${data.isCorrect ? 'correct' : 'incorrect'}">
                    <h3>${data.isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                    <p>Your score: ${data.score} points</p>
                </div>
            `;
        });

        // Listen for leaderboard updates
        socket.on('leaderboard:update', (data) => {
            const container = document.getElementById('leaderboard-container');
            container.innerHTML = `
                <h3>Leaderboard</h3>
                <ol>
                    ${data.leaderboard.map(entry => `
                        <li>User ${entry.userId}: ${entry.score} points</li>
                    `).join('')}
                </ol>
            `;
        });

        // Listen for session end
        socket.on('session:ended', (data) => {
            document.getElementById('waiting-message').textContent = 'Quiz session ended';
            document.getElementById('question-container').style.display = 'none';
        });
    }
})();

