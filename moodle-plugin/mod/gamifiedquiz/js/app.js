/**
 * Gamified Quiz Frontend Application
 * Handles WebSocket connection and UI interactions
 */

(function() {
    'use strict';

    // Wait for config to be available
    function initApp() {
    const config = window.GAMIFIED_QUIZ_CONFIG;
    if (!config) {
            console.error('Gamified Quiz config not found. Retrying...');
            setTimeout(initApp, 100);
        return;
    }

        console.log('Gamified Quiz config loaded:', config);
        startApp(config);
    }
    
    function startApp(config) {

        // Initialize Socket.IO connection (declare at function scope)
        let socket = null;
        
        try {
            if (typeof io === 'undefined') {
                console.error('Socket.IO not loaded. Please check if the library is available.');
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger';
                errorDiv.style.cssText = 'padding: 15px; margin: 10px; background: #f8d7da; border: 1px solid #dc3545; border-radius: 4px; color: #721c24;';
                errorDiv.textContent = 'WebSocket library not loaded. Please refresh the page.';
                const container = document.querySelector('.gamifiedquiz-container') || document.body;
                container.insertBefore(errorDiv, container.firstChild);
            } else {
                socket = io(config.wsUrl, {
        auth: {
            token: config.jwtToken
        },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionAttempts: 5
    });

    // Connection handlers
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

            socket.on('connect_error', (error) => {
                console.error('WebSocket connection error:', error);
                if (config.role === 'teacher') {
                    const status = document.getElementById('session-status');
                    if (status) {
                        status.style.display = 'block';
                        status.textContent = 'Warning: WebSocket connection failed. Some features may not work.';
                        status.style.background = '#fff3cd';
                        status.style.borderColor = '#ffc107';
                    }
                }
            });

    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
            }
        } catch (error) {
            console.error('Error initializing Socket.IO:', error);
            socket = null;
        }
        
        // Make socket available globally for this module
        window.gamifiedQuizSocket = socket;

    // Initialize app based on role
    if (config.role === 'teacher') {
            initTeacherApp(config, socket);
    } else {
            initStudentApp(config, socket);
        }
    }

    /**
     * Teacher Application
     */
    function initTeacherApp(config, socket) {
        // Don't overwrite HTML - buttons are already in view.php
        // Just attach event listeners to existing elements
        
        const generateBtn = document.getElementById('generate-questions-btn');
        const editBtn = document.getElementById('edit-questions-btn');
        const startBtn = document.getElementById('start-session-btn');
        const endBtn = document.getElementById('end-session-btn');
        const nextBtn = document.getElementById('next-question-btn');
        
        if (!generateBtn) {
            console.error('Generate questions button not found!');
            return;
        }

        let questions = [];
        let currentQuestionIndex = 0;
        
        // Question Editor Functions (define early for hoisting)
        function openQuestionEditor(questionsList, config) {
            const modal = document.getElementById('question-editor-modal');
            const form = document.getElementById('question-editor-form');
            
            if (!modal || !form) {
                console.error('Question editor modal not found');
                return;
            }
            
            modal.style.display = 'block';
            form.innerHTML = '';
            
            // Use provided questions or current questions
            const qList = questionsList && questionsList.length > 0 ? questionsList : (window.currentQuestions || []);
            
            // Add questions
            qList.forEach((q, index) => {
                addQuestionToEditor(form, q, index);
            });
            
            // Add "Add Question" button
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = 'btn btn-secondary';
            addBtn.textContent = 'Add New Question';
            addBtn.style.cssText = 'margin-top: 20px; padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;';
            addBtn.onclick = () => addQuestionToEditor(form, null, qList.length);
            form.appendChild(addBtn);
            
            // Close button handler
            const closeBtn = modal.querySelector('.question-editor-close');
            if (closeBtn) {
                closeBtn.onclick = () => {
                    modal.style.display = 'none';
                };
            }
            
            // Cancel button handler
            const cancelBtn = document.getElementById('cancel-edit-btn');
            if (cancelBtn) {
                cancelBtn.onclick = () => {
                    modal.style.display = 'none';
                };
            }
            
            // Save button handler
            const saveBtn = document.getElementById('save-questions-btn');
            if (saveBtn) {
                saveBtn.onclick = () => saveQuestions(config);
            }
        }
        
        function addQuestionToEditor(form, question, index) {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-editor-item';
            questionDiv.style.cssText = 'border: 2px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px; background: #f9f9f9;';
            
            const qText = question ? (question.question || question.question_text || '') : '';
            const choices = question ? (question.choices || []) : [];
            const correctIndex = question ? (question.correct_index || 0) : 0;
            
            questionDiv.innerHTML = `
                <h4>Question ${index + 1}</h4>
                <label>Question Text:</label>
                <textarea class="question-text-input" rows="3" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">${qText}</textarea>
                <label>Choices:</label>
                <div class="choices-container-${index}"></div>
                <button type="button" class="add-choice-btn" data-index="${index}" style="margin-top: 10px; padding: 8px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Choice</button>
                <button type="button" class="remove-question-btn" data-index="${index}" style="margin-top: 10px; margin-left: 10px; padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Remove Question</button>
            `;
            
            form.appendChild(questionDiv);
            
            const choicesContainer = questionDiv.querySelector(`.choices-container-${index}`);
            
            // Add existing choices
            choices.forEach((choice, cIndex) => {
                const choiceText = typeof choice === 'string' ? choice : (choice.text || '');
                const isCorrect = typeof choice === 'object' ? (choice.is_correct || cIndex === correctIndex) : (cIndex === correctIndex);
                addChoiceToEditor(choicesContainer, index, cIndex, choiceText, isCorrect);
            });
            
            // Add choice button handler
            const addChoiceBtn = questionDiv.querySelector('.add-choice-btn');
            addChoiceBtn.onclick = () => {
                addChoiceToEditor(choicesContainer, index, choicesContainer.children.length, '', false);
            };
            
            // Remove question button handler
            const removeBtn = questionDiv.querySelector('.remove-question-btn');
            removeBtn.onclick = () => {
                questionDiv.remove();
            };
        }
        
        function addChoiceToEditor(container, qIndex, cIndex, text, isCorrect) {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'choice-input-group';
            choiceDiv.style.cssText = 'display: flex; align-items: center; margin: 8px 0; gap: 10px;';
            choiceDiv.innerHTML = `
                <input type="radio" name="correct-${qIndex}" ${isCorrect ? 'checked' : ''} value="${cIndex}" style="width: 20px; height: 20px;">
                <input type="text" class="choice-text-input" value="${text}" placeholder="Choice text" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                <button type="button" class="remove-choice-btn" style="padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Remove</button>
            `;
            
            const removeBtn = choiceDiv.querySelector('.remove-choice-btn');
            removeBtn.onclick = () => choiceDiv.remove();
            
            container.appendChild(choiceDiv);
        }
        
        function saveQuestions(config) {
            const modal = document.getElementById('question-editor-modal');
            const form = document.getElementById('question-editor-form');
            const questionItems = form.querySelectorAll('.question-editor-item');
            
            const savedQuestions = [];
            
            questionItems.forEach((item, qIndex) => {
                const qText = item.querySelector('.question-text-input').value.trim();
                if (!qText) return;
                
                const choices = [];
                const choicesContainer = item.querySelector(`.choices-container-${qIndex}`);
                const choiceInputs = choicesContainer.querySelectorAll('.choice-text-input');
                const correctRadio = item.querySelector(`input[name="correct-${qIndex}"]:checked`);
                
                let correctIndex = 0;
                choiceInputs.forEach((input, cIndex) => {
                    const text = input.value.trim();
                    if (text) {
                        choices.push({
                            text: text,
                            is_correct: false
                        });
                        if (correctRadio && parseInt(correctRadio.value) === cIndex) {
                            correctIndex = choices.length - 1;
                        }
                    }
                });
                
                if (choices.length >= 2) {
                    choices[correctIndex].is_correct = true;
                    savedQuestions.push({
                        question: qText,
                        choices: choices,
                        correct_index: correctIndex,
                        difficulty: config.difficulty || 'medium'
                    });
                }
            });
            
            if (savedQuestions.length === 0) {
                alert('Please add at least one question with at least 2 choices');
                return;
            }
            
            // Save via AJAX
            saveQuestionsToServer(savedQuestions, config);
        }
        
        async function saveQuestionsToServer(questions, config) {
            try {
                const wwwroot = config.wwwroot || '';
                const sesskey = config.sesskey || '';
                const url = wwwroot + '/mod/gamifiedquiz/ajax/save_questions.php';
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `quizid=${config.quizId}&cmid=${config.cmId}&sesskey=${sesskey}&questions=${encodeURIComponent(JSON.stringify(questions))}`
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Questions saved successfully!');
                    document.getElementById('question-editor-modal').style.display = 'none';
                    questions = data.questions || questions;
                    window.currentQuestions = questions;
                    displayQuestions(questions);
                    if (startBtn) startBtn.disabled = false;
                } else {
                    alert('Error saving questions: ' + (data.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error saving questions:', error);
                alert('Error saving questions: ' + error.message);
            }
        }
        
        function displayQuestions(questionsList) {
            const container = document.getElementById('questions-container');
            if (!container) return;
            
            container.innerHTML = '<h3>Questions (' + questionsList.length + ')</h3>';
            
            questionsList.forEach((q, index) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'question-preview';
                const qText = q.question || q.question_text || '';
                const choices = q.choices || [];
                
                let choicesHtml = '<ul>';
                choices.forEach((choice, cIndex) => {
                    const isCorrect = typeof choice === 'object' ? choice.is_correct : (cIndex === q.correct_index);
                    const choiceText = typeof choice === 'string' ? choice : (choice.text || '');
                    choicesHtml += `<li class="${isCorrect ? 'correct' : ''}">${choiceText}</li>`;
                });
                choicesHtml += '</ul>';
                
                qDiv.innerHTML = `
                    <h4>Question ${index + 1}</h4>
                    <p>${qText}</p>
                    ${choicesHtml}
                `;
                container.appendChild(qDiv);
            });
        }
        
        // Question Editor functionality
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                // Use current questions or empty array
                const qList = questions.length > 0 ? questions : (window.currentQuestions || []);
                openQuestionEditor(qList, config);
            });
        }
        
        // Check for predefined questions
        if (config.usePredefined && config.predefinedData) {
            try {
                const predefined = JSON.parse(config.predefinedData);
                if (Array.isArray(predefined) && predefined.length > 0) {
                    questions = predefined;
                    displayQuestions(questions);
                    if (startBtn) startBtn.disabled = false;
                }
            } catch (e) {
                console.error('Error parsing predefined data:', e);
            }
        }
        
        // Check for edited questions
        if (config.questionsData) {
            try {
                const edited = JSON.parse(config.questionsData);
                if (Array.isArray(edited) && edited.length > 0) {
                    questions = edited;
                    displayQuestions(questions);
                    if (startBtn) startBtn.disabled = false;
                }
            } catch (e) {
                console.error('Error parsing questions data:', e);
            }
        }
        
        // Load questions from database if none found
        if (questions.length === 0) {
            loadQuestionsFromDB(config);
        }
        
        // Function to load questions from database
        async function loadQuestionsFromDB(config) {
            try {
                const wwwroot = config.wwwroot || '';
                const sesskey = config.sesskey || '';
                const url = wwwroot + '/mod/gamifiedquiz/ajax/load_questions.php';
                
                const response = await fetch(url + '?quizid=' + config.quizId + '&cmid=' + config.cmId + '&sesskey=' + sesskey);
                const data = await response.json();
                
                if (data.success && data.questions && data.questions.length > 0) {
                    questions = data.questions;
                    window.currentQuestions = questions;
                    displayQuestions(questions);
                    if (startBtn) startBtn.disabled = false;
                    console.log('Loaded ' + questions.length + ' questions from ' + (data.source || 'database'));
                }
            } catch (error) {
                console.error('Error loading questions from DB:', error);
            }
        }

        // Generate questions
        generateBtn.addEventListener('click', async () => {
            console.log('Generate Questions button clicked!');
            const btn = document.getElementById('generate-questions-btn');
            if (!btn) {
                console.error('Button not found after click!');
                return;
            }
            btn.disabled = true;
            btn.textContent = 'Generating...';
            console.log('Starting question generation...');
            
            try {
                const wwwroot = config.wwwroot || (typeof M !== 'undefined' && M.cfg && M.cfg.wwwroot) || '';
                const sesskey = config.sesskey || (typeof M !== 'undefined' && M.cfg && M.cfg.sesskey) || '';
                const url = wwwroot + '/mod/gamifiedquiz/ajax/generate.php';
                
                const response = await fetch(url, {
                method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'quizid=' + config.quizId + '&cmid=' + config.cmId + '&sesskey=' + sesskey
                });
                
                let responseText = '';
                let data;
                
                // Get response text first
                responseText = await response.text();
                console.log('Generate questions raw response (status ' + response.status + '):', responseText);
                
                if (!response.ok) {
                    // Try to parse error response
                    let errorMessage = 'HTTP error! status: ' + response.status;
                    try {
                        if (responseText) {
                            data = JSON.parse(responseText);
                            if (data.error) {
                                errorMessage = data.error;
                                console.error('Server error details:', data);
                            }
                        }
                    } catch (parseErr) {
                        console.error('Failed to parse error response:', parseErr);
                        if (responseText) {
                            errorMessage += '. Response: ' + responseText.substring(0, 500);
                        }
                    }
                    throw new Error(errorMessage);
                }
                
                try {
                    
                    if (!responseText || responseText.trim() === '') {
                        throw new Error('Empty response from server');
                    }
                    
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('Failed to parse JSON response:', parseError);
                    console.error('Response text was:', responseText);
                    throw new Error('Invalid response from server: ' + parseError.message + '. Response: ' + responseText.substring(0, 200));
                }
                
                console.log('Generate questions parsed response:', data);
                
                // If there's an error in the response, show it
                if (data.error) {
                    console.error('Server error details:', data);
                }
                
                if (data.success && data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
                questions = data.questions;
                    console.log('Questions received:', questions);
                    // Store questions globally for editor
                    window.currentQuestions = questions;
                displayQuestions(questions);
                    if (startBtn) startBtn.disabled = false;
                    const statusEl = document.getElementById('session-status');
                    if (statusEl) {
                        statusEl.style.display = 'block';
                        statusEl.textContent = 'Questions generated successfully! (' + (data.count || questions.length) + ' questions) Ready to start session.';
                        statusEl.style.background = '#d4edda';
                        statusEl.style.borderColor = '#28a745';
                    }
                } else {
                    const errorMsg = data.error || 'Failed to generate questions. Please check LLM API configuration.';
                    console.error('Generate questions error:', data);
                    alert('Error: ' + errorMsg.replace(/\\n/g, '\n'));
                    if (data.api_url) {
                        console.log('API URL:', data.api_url);
                    }
                }
            } catch (error) {
                console.error('Error generating questions:', error);
                alert('Error generating questions: ' + error.message + '\n\nPlease check:\n1. LLM API is running\n2. LLM API URL is correct in plugin settings\n3. Browser console for details');
                const statusEl = document.getElementById('session-status');
                if (statusEl) {
                    statusEl.style.display = 'block';
                    statusEl.textContent = 'Error: ' + error.message;
                    statusEl.style.background = '#f8d7da';
                    statusEl.style.borderColor = '#dc3545';
                }
            } finally {
                btn.disabled = false;
                btn.textContent = 'Generate Questions';
            }
        });

        // Start session
        startBtn.addEventListener('click', () => {
            if (questions.length === 0) {
                alert('Please generate questions first!');
                return;
            }
            if (!socket || !socket.connected) {
                alert('WebSocket not connected. Please check your connection and refresh the page.');
                return;
            }
            socket.emit('teacher:create_session', {
                session_id: config.sessionId,
                quiz_id: config.quizId
            });
            if (startBtn) startBtn.disabled = true;
            if (endBtn) endBtn.disabled = false;
            if (nextBtn) nextBtn.disabled = false;
            currentQuestionIndex = 0;
            const statusEl = document.getElementById('session-status');
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.textContent = 'Session started! Students can now join.';
                statusEl.style.background = '#d1ecf1';
                statusEl.style.borderColor = '#0c5460';
            }
        });

        // End session
        if (endBtn) {
            endBtn.addEventListener('click', () => {
            socket.emit('teacher:end_session');
        });
        }

        // Next question button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pushNextQuestion();
            });
        }

        // Push question
        function pushNextQuestion() {
            if (!socket || !socket.connected) {
                alert('WebSocket not connected. Cannot push question.');
                return;
            }
            if (currentQuestionIndex >= questions.length) {
                alert('No more questions! Ending session.');
                socket.emit('teacher:end_session');
                return;
            }

            const question = questions[currentQuestionIndex];
            const questionData = {
                question: {
                    id: 'q' + (currentQuestionIndex + 1),
                    text: question.question || question.question_text,
                    choices: Array.isArray(question.choices) 
                        ? question.choices.map(c => typeof c === 'string' ? c : c.text)
                        : JSON.parse(question.choices || '[]').map(c => typeof c === 'string' ? c : c.text),
                    correct_index: question.correct_index
                },
                timer: 60,
                questionNumber: currentQuestionIndex + 1
            };
            
            socket.emit('teacher:push_question', questionData);
            
            // Update display
            const currentQEl = document.getElementById('current-question-display');
            const currentQText = document.getElementById('current-question-text');
            if (currentQEl && currentQText) {
                currentQEl.style.display = 'block';
                const qText = question.question || question.question_text || '';
                const choices = Array.isArray(question.choices) 
                    ? question.choices 
                    : (typeof question.choices === 'string' ? JSON.parse(question.choices || '[]') : []);
                currentQText.innerHTML = `
                    <p><strong>Question ${currentQuestionIndex + 1}:</strong> ${qText}</p>
                    <ul>
                        ${choices.map((c, i) => `<li ${i === question.correct_index ? 'style="color: green; font-weight: bold;"' : ''}>${typeof c === 'string' ? c : (c.text || '')}</li>`).join('')}
                    </ul>
                `;
            }
            
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length) {
                if (nextBtn) nextBtn.disabled = true;
            }
            
            // Display current question
            document.getElementById('current-question-display').style.display = 'block';
            document.getElementById('current-question-text').innerHTML = `
                <strong>Question ${currentQuestionIndex + 1} of ${questions.length}</strong><br>
                ${questionData.question.text}
            `;
            
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length && nextBtn) {
                nextBtn.textContent = 'End Session';
            }
        }

        // Display questions
        function displayQuestions(qs) {
            const container = document.getElementById('questions-container');
            if (!container) {
                console.error('Questions container not found!');
                return;
            }
            
            if (!Array.isArray(qs) || qs.length === 0) {
                container.innerHTML = '<p>No questions to display.</p>';
                return;
            }
            
            try {
                container.innerHTML = '<h3>Generated Questions Preview</h3>' + qs.map((q, i) => {
                    const questionText = q.question || q.question_text || 'No question text';
                    let choices = [];
                    
                    if (Array.isArray(q.choices)) {
                        choices = q.choices.map(c => {
                            if (typeof c === 'string') {
                                return {text: c, is_correct: false};
                            }
                            return c;
                        });
                    } else if (typeof q.choices === 'string') {
                        try {
                            const parsed = JSON.parse(q.choices);
                            choices = Array.isArray(parsed) 
                                ? parsed.map(c => typeof c === 'string' ? {text: c, is_correct: false} : c)
                                : [];
                        } catch (e) {
                            console.error('Failed to parse choices:', e);
                            choices = [];
                        }
                    }
                    
                    // Mark correct answer
                    const correctIndex = q.correct_index !== undefined ? parseInt(q.correct_index) : -1;
                    if (correctIndex >= 0 && correctIndex < choices.length) {
                        choices[correctIndex].is_correct = true;
                    }
                    
                    return `
                <div class="question-preview">
                    <h4>Question ${i + 1}</h4>
                            <p>${questionText}</p>
                            <ul>
                                ${choices.map((c, idx) => `
                                    <li class="${c.is_correct ? 'correct' : ''}">
                                        ${idx === correctIndex ? '✓ ' : ''}${c.text || c}
                                    </li>
                        `).join('')}
                    </ul>
                </div>
                    `;
                }).join('');
                
                console.log('Questions displayed successfully');
            } catch (error) {
                console.error('Error displaying questions:', error);
                container.innerHTML = '<p>Error displaying questions. Check console for details.</p>';
            }
        }

        // Listen for session events
        socket.on('session:created', (data) => {
            const statusEl = document.getElementById('session-status');
            if (statusEl) {
                statusEl.textContent = 'Session active - Students can join';
                statusEl.style.background = '#d1ecf1';
            }
        });

        socket.on('session:ended', (data) => {
            const statusEl = document.getElementById('session-status');
            if (statusEl) {
                statusEl.textContent = 'Session ended';
                statusEl.style.background = '#f8d7da';
            }
            if (endBtn) endBtn.disabled = true;
            if (nextBtn) nextBtn.disabled = true;
            const currentQEl = document.getElementById('current-question-display');
            if (currentQEl) currentQEl.style.display = 'none';
        });

        // Listen for leaderboard updates
        socket.on('leaderboard:update', (data) => {
            updateLeaderboard(data.leaderboard || []);
        });

        function updateLeaderboard(leaderboard) {
            const container = document.getElementById('leaderboard-container');
            if (leaderboard.length === 0) {
                container.innerHTML = '<h3>Leaderboard</h3><p>No scores yet.</p>';
                return;
            }
            container.innerHTML = `
                <h3>Leaderboard</h3>
                <ol>
                    ${leaderboard.map((entry, index) => `
                        <li>
                            <strong>${entry.username || 'User ' + entry.userId}</strong>: 
                            ${entry.score || 0} points
                            ${index < 3 ? ' 🏆' : ''}
                        </li>
                    `).join('')}
                </ol>
            `;
        }
    }

    /**
     * Student Application
     */
    function initStudentApp(config, socket) {
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
            const questionNumber = data.questionNumber || 1;
            document.getElementById('question-number').textContent = `Question ${questionNumber}`;
            displayQuestion(data.question, data.timer || 60);
            document.getElementById('waiting-message').style.display = 'none';
            document.getElementById('question-container').style.display = 'block';
            document.getElementById('result-container').style.display = 'none';
            document.getElementById('submit-btn').disabled = true;
        });

        // Display question
        function displayQuestion(question, timer) {
            // Handle different question formats
            const questionText = question.text || question.question || question.question_text || '';
            document.getElementById('question-text').textContent = questionText;
            
            const choicesContainer = document.getElementById('choices');
            const choices = Array.isArray(question.choices) ? question.choices : [];
            choicesContainer.innerHTML = choices.map((choice, index) => `
                <label class="choice-option" data-index="${index}">
                    <input type="radio" name="answer" value="${index}">
                    ${typeof choice === 'string' ? choice : (choice.text || choice)}
                </label>
            `).join('');

            // Handle choice selection
            choicesContainer.querySelectorAll('label.choice-option').forEach(label => {
                label.addEventListener('click', (e) => {
                    // Remove previous selection
                    choicesContainer.querySelectorAll('label.choice-option').forEach(l => {
                        l.classList.remove('selected');
                    });
                    // Select this one
                    label.classList.add('selected');
                    const radio = label.querySelector('input[type="radio"]');
                    radio.checked = true;
                    selectedAnswer = parseInt(radio.value);
                    document.getElementById('submit-btn').disabled = false;
                });
            });

            // Start timer
            let remaining = timer || 60;
            document.getElementById('timer').textContent = `Time remaining: ${remaining}s`;
            
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                remaining--;
                document.getElementById('timer').textContent = `Time remaining: ${remaining}s`;
                if (remaining <= 10) {
                    document.getElementById('timer').style.color = '#dc3545';
                }
                if (remaining <= 0) {
                    clearInterval(timerInterval);
                    submitAnswer();
                }
            }, 1000);
        }

        // Submit answer
        function submitAnswer() {
            if (!socket || !socket.connected) {
                alert('WebSocket not connected. Cannot submit answer.');
                return;
            }
            if (selectedAnswer === null) {
                selectedAnswer = -1; // No answer selected
            }
            
            const timerText = document.getElementById('timer').textContent;
            const timeMatch = timerText.match(/\d+/);
            const timeSpent = timeMatch ? 60 - parseInt(timeMatch[0]) : 0;

            socket.emit('student:submit_answer', {
                questionId: currentQuestion.id,
                answerIndex: selectedAnswer,
                timeSpent: timeSpent
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
            const leaderboard = data.leaderboard || [];
            if (leaderboard.length === 0) {
                container.innerHTML = '<h3>Leaderboard</h3><p>No scores yet.</p>';
                return;
            }
            container.innerHTML = `
                <h3>Leaderboard</h3>
                <ol>
                    ${leaderboard.map((entry, index) => `
                        <li>
                            <strong>${entry.username || 'User ' + entry.userId}</strong>: 
                            ${entry.score || 0} points
                            ${index < 3 ? ' 🏆' : ''}
                        </li>
                    `).join('')}
                </ol>
            `;
        });

        // Listen for session end
        socket.on('session:ended', (data) => {
            const waitingMsg = document.getElementById('waiting-message');
            if (waitingMsg) {
                waitingMsg.textContent = 'Quiz session ended';
            }
            const questionContainer = document.getElementById('question-container');
            if (questionContainer) {
                questionContainer.style.display = 'none';
            }
        });
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();

