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
                    // Don't display questions preview
                    // displayQuestions(questions);
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
                    // Don't display questions preview
                    // displayQuestions(questions);
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
                    // Don't display questions preview
                    // displayQuestions(questions);
                    if (startBtn) startBtn.disabled = false;
                    // Reset question index
                    currentQuestionIndex = 0;
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

        // Generate questions dialog elements
        const generateModal = document.getElementById('generate-questions-modal');
        const generateForm = document.getElementById('generate-questions-form');
        const generateCloseBtn = document.querySelector('.generate-questions-close');
        const cancelGenerateBtn = document.getElementById('cancel-generate-btn');
        const loadingModal = document.getElementById('loading-modal');
        
        // Show generate questions dialog
        generateBtn.addEventListener('click', () => {
            if (generateModal) {
                generateModal.style.display = 'flex';
            }
        });
        
        // Close generate dialog
        if (generateCloseBtn) {
            generateCloseBtn.addEventListener('click', () => {
                if (generateModal) {
                    generateModal.style.display = 'none';
                }
            });
        }
        
        if (cancelGenerateBtn) {
            cancelGenerateBtn.addEventListener('click', () => {
                if (generateModal) {
                    generateModal.style.display = 'none';
                }
            });
        }
        
        // Close modal when clicking outside
        if (generateModal) {
            generateModal.addEventListener('click', (e) => {
                if (e.target === generateModal) {
                    generateModal.style.display = 'none';
                }
            });
        }
        
        // Handle generate form submission
        if (generateForm) {
            generateForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const prompt = document.getElementById('generate-prompt').value.trim();
                const predefinedData = document.getElementById('generate-data').value.trim();
                const difficulty = document.getElementById('generate-difficulty').value;
                const questionCount = document.getElementById('generate-count').value;
                
                if (!prompt) {
                    alert('Please enter a prompt/topic for question generation.');
                    return;
                }
                
                // Hide generate dialog and show loading dialog
                if (generateModal) {
                    generateModal.style.display = 'none';
                }
                if (loadingModal) {
                    loadingModal.style.display = 'flex';
                }
                
                console.log('Starting question generation with:', { prompt, predefinedData, difficulty, questionCount });
                
                try {
                    const wwwroot = config.wwwroot || (typeof M !== 'undefined' && M.cfg && M.cfg.wwwroot) || '';
                    const sesskey = config.sesskey || (typeof M !== 'undefined' && M.cfg && M.cfg.sesskey) || '';
                    const url = wwwroot + '/mod/gamifiedquiz/ajax/generate.php';
                    
                    // Build form data
                    const formData = new URLSearchParams();
                    formData.append('quizid', config.quizId);
                    formData.append('cmid', config.cmId);
                    formData.append('sesskey', sesskey);
                    formData.append('prompt', prompt);
                    formData.append('data', predefinedData);
                    formData.append('difficulty', difficulty);
                    formData.append('count', questionCount);
                    
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: formData.toString()
                    });
                    
                    let responseText = '';
                    let responseData;
                    
                    // Get response text first
                    responseText = await response.text();
                    console.log('Generate questions raw response (status ' + response.status + '):', responseText);
                    
                    if (!response.ok) {
                        // Try to parse error response
                        let errorMessage = 'HTTP error! status: ' + response.status;
                        try {
                            if (responseText) {
                                responseData = JSON.parse(responseText);
                                if (responseData.error) {
                                    errorMessage = responseData.error;
                                    console.error('Server error details:', responseData);
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
                        
                        responseData = JSON.parse(responseText);
                    } catch (parseError) {
                        console.error('Failed to parse JSON response:', parseError);
                        console.error('Response text was:', responseText);
                        throw new Error('Invalid response from server: ' + parseError.message + '. Response: ' + responseText.substring(0, 200));
                    }
                    
                    console.log('Generate questions parsed response:', responseData);
                    
                    // Hide loading dialog
                    if (loadingModal) {
                        loadingModal.style.display = 'none';
                    }
                    
                    // If there's an error in the response, show it
                    if (responseData.error) {
                        console.error('Server error details:', responseData);
                    }
                    
                    if (responseData.success && responseData.questions && Array.isArray(responseData.questions) && responseData.questions.length > 0) {
                        questions = responseData.questions;
                        console.log('Questions received:', questions);
                        // Store questions globally for editor
                        window.currentQuestions = questions;
                        // Don't display questions preview - just show status
                        // displayQuestions(questions);
                        if (startBtn) startBtn.disabled = false;
                        // Reset question index
                        currentQuestionIndex = 0;
                        const statusEl = document.getElementById('session-status');
                        if (statusEl) {
                            statusEl.style.display = 'block';
                            statusEl.textContent = 'Questions generated successfully! (' + (responseData.count || questions.length) + ' questions) Ready to start session.';
                            statusEl.style.background = '#d4edda';
                            statusEl.style.borderColor = '#28a745';
                        }
                    } else {
                        const errorMsg = responseData.error || 'Failed to generate questions. Please check LLM API configuration.';
                        console.error('Generate questions error:', responseData);
                        alert('Error: ' + errorMsg.replace(/\\n/g, '\n'));
                        if (responseData.api_url) {
                            console.log('API URL:', responseData.api_url);
                        }
                    }
                } catch (error) {
                    console.error('Error generating questions:', error);
                    // Hide loading dialog
                    if (loadingModal) {
                        loadingModal.style.display = 'none';
                    }
                    alert('Error generating questions: ' + error.message + '\n\nPlease check:\n1. LLM API is running\n2. LLM API URL is correct in plugin settings\n3. Browser console for details');
                    const statusEl = document.getElementById('session-status');
                    if (statusEl) {
                        statusEl.style.display = 'block';
                        statusEl.textContent = 'Error: ' + error.message;
                        statusEl.style.background = '#f8d7da';
                        statusEl.style.borderColor = '#dc3545';
                    }
                }
            });
        }

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
            
            // Automatically push first question when session starts
            setTimeout(() => {
            pushNextQuestion();
            }, 1000); // Small delay to ensure session is created
        });

        // End session
        if (endBtn) {
            endBtn.addEventListener('click', () => {
            socket.emit('teacher:end_session');
        });
        }

        // Next question button
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next Question button clicked');
                pushNextQuestion();
            });
        } else {
            console.error('Next Question button not found!');
        }

        // Push question
        function pushNextQuestion() {
            console.log('pushNextQuestion called', {
                socketConnected: socket && socket.connected,
                currentQuestionIndex,
                questionsLength: questions.length,
                questions: questions
            });
            
            if (!socket || !socket.connected) {
                alert('WebSocket not connected. Cannot push question.');
                return;
            }
            if (currentQuestionIndex >= questions.length) {
                alert('No more questions! Ending session.');
                socket.emit('teacher:end_session');
                return;
            }
            if (!questions || questions.length === 0) {
                alert('No questions available. Please generate questions first.');
                return;
            }

            const question = questions[currentQuestionIndex];
            if (!question) {
                console.error('Question at index', currentQuestionIndex, 'is undefined');
                alert('Error: Question not found. Please try again.');
                return;
            }
            
            const timeLimit = config.timeLimitPerQuestion || 60;
            
            // Parse choices properly
            let choicesArray = [];
            if (Array.isArray(question.choices)) {
                choicesArray = question.choices.map(c => typeof c === 'string' ? c : (c.text || c));
            } else if (typeof question.choices === 'string') {
                try {
                    const parsed = JSON.parse(question.choices);
                    choicesArray = Array.isArray(parsed) 
                        ? parsed.map(c => typeof c === 'string' ? c : (c.text || c))
                        : [];
                } catch (e) {
                    console.error('Error parsing choices:', e);
                    choicesArray = [];
                }
            }
            
            const questionData = {
                question: {
                    id: 'q' + (currentQuestionIndex + 1),
                    text: question.question || question.question_text || '',
                    choices: choicesArray,
                    correct_index: parseInt(question.correct_index) || 0
                },
                timer: timeLimit,
                questionNumber: currentQuestionIndex + 1,
                totalQuestions: questions.length
            };
            
            console.log('Pushing question:', questionData);
            socket.emit('teacher:push_question', questionData);
            
            // Show active question display for teacher (Kahoot-style)
            const activeQEl = document.getElementById('active-question-display');
            const activeQNum = document.getElementById('active-question-number');
            const activeQText = document.getElementById('active-question-text');
            const activeQTimer = document.getElementById('active-question-timer');
            const activeQChoices = document.getElementById('active-question-choices');
            
            // Kahoot colors: red, blue, yellow, green
            const kahootColors = [
                { bg: '#DB524D', border: '#C73E39', text: 'white' }, // Red
                { bg: '#4A90E2', border: '#357ABD', text: 'white' }, // Blue
                { bg: '#F5A623', border: '#D68910', text: 'white' }, // Yellow
                { bg: '#7ED321', border: '#6BB01A', text: 'white' }  // Green
            ];
            
            if (activeQEl) {
                activeQEl.style.display = 'block';
                if (activeQNum) activeQNum.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
                if (activeQText) activeQText.textContent = questionData.question.text;
                if (activeQTimer) {
                    activeQTimer.textContent = `${timeLimit}s`;
                    activeQTimer.style.color = '#007bff';
                }
                if (activeQChoices) {
                    activeQChoices.innerHTML = questionData.question.choices.map((c, i) => {
                        const color = kahootColors[i % 4];
                        const isCorrect = i === question.correct_index;
                        return `
                            <div class="kahoot-choice" 
                                 style="background: ${color.bg}; 
                                        border: 4px solid ${color.border}; 
                                        color: ${color.text}; 
                                        padding: 30px 20px; 
                                        border-radius: 12px; 
                                        font-size: 24px; 
                                        font-weight: bold; 
                                        text-align: center; 
                                        cursor: default;
                                        position: relative;
                                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                                        transition: transform 0.2s;">
                                ${isCorrect ? '<span style="position: absolute; top: 10px; right: 10px; font-size: 32px;">✓</span>' : ''}
                                <div style="font-size: 48px; margin-bottom: 10px;">${String.fromCharCode(65 + i)}</div>
                                <div>${c}</div>
                            </div>
                        `;
                    }).join('');
                }
            }
            
            // Start timer countdown for teacher view
            let remaining = timeLimit;
            const teacherTimerInterval = setInterval(() => {
                remaining--;
                if (activeQTimer) {
                    activeQTimer.textContent = `${remaining}s`;
                    if (remaining <= 10) {
                        activeQTimer.style.color = '#dc3545';
                        activeQTimer.style.background = '#f8d7da';
                    }
                }
                if (remaining <= 0) {
                    clearInterval(teacherTimerInterval);
                    if (activeQTimer) {
                        activeQTimer.textContent = 'Time\'s Up!';
                        activeQTimer.style.color = '#721c24';
                        activeQTimer.style.background = '#f8d7da';
                    }
                }
            }, 1000);
            
            // Store timer interval to clear if needed
            if (window.teacherTimerInterval) {
                clearInterval(window.teacherTimerInterval);
            }
            window.teacherTimerInterval = teacherTimerInterval;
            
            // Hide previous results
            const resultsEl = document.getElementById('question-results-display');
            if (resultsEl) resultsEl.style.display = 'none';
            
            // Increment index AFTER pushing
            currentQuestionIndex++;
            
            // Disable next button until timer expires (results will enable it)
            if (nextBtn) {
                nextBtn.disabled = true;
                if (currentQuestionIndex >= questions.length) {
                    nextBtn.textContent = 'End Quiz';
                } else {
                    nextBtn.textContent = 'Next Question';
                }
            }
        }
        
        // Listen for question timeout to enable next button and show results
        socket.on('question:timeout', () => {
            console.log('Question timeout - enabling next button and showing results');
            if (nextBtn) {
                nextBtn.disabled = false;
                if (currentQuestionIndex >= questions.length) {
                    nextBtn.textContent = 'End Quiz';
                } else {
                    nextBtn.textContent = 'Next Question';
                }
            }
            
            // Auto-show results when time is up
            displayQuestionResults();
        });

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

        // Track previous scores for comparison
        let previousScores = {};
        let questionResults = [];
        
        // Listen for question results
        socket.on('question:results', (data) => {
            console.log('Question results received:', data);
            displayQuestionResults(data);
            // Enable next button when results are shown
            if (nextBtn) {
                nextBtn.disabled = false;
                if (currentQuestionIndex >= questions.length) {
                    nextBtn.textContent = 'End Quiz';
                } else {
                    nextBtn.textContent = 'Next Question';
                }
            }
        });
        
        // Listen for leaderboard updates
        socket.on('leaderboard:update', (data) => {
            console.log('Leaderboard update received:', data);
            console.log('Leaderboard data:', data.leaderboard);
            if (data.leaderboard && data.leaderboard.length > 0) {
                displayLeaderboard(data.leaderboard);
            } else {
                console.log('No leaderboard data to display');
                // Show empty leaderboard
                displayLeaderboard([]);
            }
        });
        
        // Add debug button to populate test leaderboard
        const debugBtn = document.createElement('button');
        debugBtn.textContent = 'Add Test Users';
        debugBtn.style.cssText = 'margin: 10px; padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;';
        debugBtn.addEventListener('click', () => {
            console.log('Adding test users to leaderboard');
            socket.emit('debug:populate_leaderboard');
        });
        
        const controlsDiv = document.querySelector('.controls');
        if (controlsDiv) {
            controlsDiv.appendChild(debugBtn);
        }
        
        // Listen for final leaderboard
        socket.on('leaderboard:final', (data) => {
            displayFinalLeaderboard(data.leaderboard || []);
        });
        
        function displayQuestionResults(data) {
            const resultsEl = document.getElementById('question-results-display');
            if (!resultsEl) return;
            
            const questionNum = data.questionNumber || currentQuestionIndex;
            const responses = data.responses || [];
            const correctCount = responses.filter(r => r.is_correct).length;
            const totalCount = responses.length;
            
            // Get current question to show answer distribution
            const questionIndex = questionNum - 1;
            const currentQuestion = questions[questionIndex];
            if (!currentQuestion) return;
            
            // Parse choices
            let choices = [];
            if (Array.isArray(currentQuestion.choices)) {
                choices = currentQuestion.choices.map(c => typeof c === 'string' ? c : (c.text || c));
            } else if (typeof currentQuestion.choices === 'string') {
                try {
                    const parsed = JSON.parse(currentQuestion.choices);
                    choices = Array.isArray(parsed) 
                        ? parsed.map(c => typeof c === 'string' ? c : (c.text || c))
                        : [];
                } catch (e) {
                    choices = [];
                }
            }
            
            // Count answers per choice
            const answerCounts = {};
            responses.forEach(r => {
                const answerIndex = r.answerIndex !== undefined ? r.answerIndex : -1;
                answerCounts[answerIndex] = (answerCounts[answerIndex] || 0) + 1;
            });
            
            // Kahoot colors
            const kahootColors = [
                { bg: '#DB524D', border: '#C73E39', text: 'white' }, // Red
                { bg: '#4A90E2', border: '#357ABD', text: 'white' }, // Blue
                { bg: '#F5A623', border: '#D68910', text: 'white' }, // Yellow
                { bg: '#7ED321', border: '#6BB01A', text: 'white' }  // Green
            ];
            
            resultsEl.style.display = 'block';
            resultsEl.innerHTML = `
                <h3 style="margin-top: 0; font-size: 28px; margin-bottom: 20px;">Question ${questionNum} Results</h3>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
                    <div style="background: #d4edda; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="font-size: 36px; font-weight: bold; color: #155724;">${correctCount}</div>
                        <div style="color: #155724; font-size: 16px; margin-top: 5px;">Correct</div>
                    </div>
                    <div style="background: #f8d7da; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="font-size: 36px; font-weight: bold; color: #721c24;">${totalCount - correctCount}</div>
                        <div style="color: #721c24; font-size: 16px; margin-top: 5px;">Incorrect</div>
                    </div>
                    <div style="background: #d1ecf1; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="font-size: 36px; font-weight: bold; color: #0c5460;">${totalCount}</div>
                        <div style="color: #0c5460; font-size: 16px; margin-top: 5px;">Total</div>
                    </div>
                    <div style="background: #fff3cd; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="font-size: 36px; font-weight: bold; color: #856404;">${totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0}%</div>
                        <div style="color: #856404; font-size: 16px; margin-top: 5px;">Accuracy</div>
                    </div>
                </div>
                <div style="margin-top: 30px;">
                    <h4 style="margin-bottom: 15px; font-size: 20px;">Answer Distribution</h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        ${choices.map((c, i) => {
                            const count = answerCounts[i] || 0;
                            const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                            const color = kahootColors[i % 4];
                            const isCorrect = i === currentQuestion.correct_index;
                            const choiceText = typeof c === 'string' ? c : (c.text || c);
                            return `
                                <div style="background: ${color.bg}; 
                                            border: 4px solid ${color.border}; 
                                            color: ${color.text}; 
                                            padding: 20px; 
                                            border-radius: 12px; 
                                            position: relative;
                                            ${isCorrect ? 'box-shadow: 0 0 0 4px #28a745;' : ''}">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <div style="font-size: 24px; font-weight: bold;">${String.fromCharCode(65 + i)}</div>
                                        ${isCorrect ? '<span style="font-size: 32px;">✓</span>' : ''}
                                    </div>
                                    <div style="font-size: 18px; margin-bottom: 10px;">${choiceText}</div>
                                    <div style="background: rgba(255,255,255,0.3); padding: 10px; border-radius: 8px; text-align: center;">
                                        <div style="font-size: 28px; font-weight: bold;">${count}</div>
                                        <div style="font-size: 14px;">${percentage}%</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
        
        function displayLeaderboard(leaderboard) {
            console.log('displayLeaderboard called with:', leaderboard);
            const container = document.getElementById('leaderboard-container');
            if (!container) {
                console.log('Leaderboard container not found');
                return;
            }
            
            if (!Array.isArray(leaderboard) || leaderboard.length === 0) {
                container.innerHTML = '<h3>🏆 Current Leaderboard</h3><p>No scores yet.</p>';
                return;
            }
            
            const topN = config.leaderboardTopN || 5;
            const topPlayers = leaderboard.slice(0, topN);
            
            console.log('Displaying top players:', topPlayers);
            
            container.innerHTML = `
                <h3>🏆 Current Leaderboard</h3>
                <ol style="padding-left: 20px;">
                    ${topPlayers.map((entry, index) => {
                        const rank = index + 1;
                        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
                        console.log('Leaderboard entry:', entry);
                        return `
                            <li style="padding: 10px; margin: 8px 0; background: ${rank <= 3 ? '#fff3cd' : '#f8f9fa'}; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: bold;">${medal} ${entry.username || 'User ' + entry.userId}</span>
                                <span style="font-size: 18px; font-weight: bold; color: #007bff;">${entry.score || 0} pts</span>
                            </li>
                        `;
                    }).join('')}
                </ol>
            `;
        }
        
        function displayFinalLeaderboard(leaderboard) {
            const container = document.getElementById('final-leaderboard-container');
        if (!container) return;

            const topN = config.leaderboardTopN || 3;
            const topPlayers = leaderboard.slice(0, topN);
            
            container.style.display = 'block';
        container.innerHTML = `
                <h2 style="margin-top: 0; text-align: center; font-size: 32px;">🏆 Final Leaderboard 🏆</h2>
                <div style="display: flex; justify-content: center; align-items: flex-end; gap: 20px; margin-top: 30px;">
                    ${topPlayers.map((entry, index) => {
                        const rank = index + 1;
                        const height = rank === 1 ? '120px' : rank === 2 ? '100px' : '80px';
                        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
                        return `
                            <div style="text-align: center; flex: 1; max-width: 200px;">
                                <div style="font-size: 48px; margin-bottom: 10px;">${medal}</div>
                                <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; height: ${height}; display: flex; flex-direction: column; justify-content: center;">
                                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">${entry.username || 'User ' + entry.userId}</div>
                                    <div style="font-size: 24px; font-weight: bold;">${entry.score || 0} pts</div>
                </div>
                                <div style="margin-top: 10px; font-size: 18px; font-weight: bold;">#${rank}</div>
            </div>
        `;
                    }).join('')}
                </div>
                ${leaderboard.length > topN ? `
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.3);">
                        <h3 style="text-align: center;">Other Participants</h3>
                        <ol style="list-style: none; padding: 0;">
                            ${leaderboard.slice(topN).map((entry, index) => `
                                <li style="padding: 10px; margin: 5px 0; background: rgba(255,255,255,0.1); border-radius: 4px;">
                                    #${topN + index + 1} - ${entry.username || 'User ' + entry.userId}: ${entry.score || 0} pts
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                ` : ''}
            `;
        }

        function updateLeaderboard(leaderboard) {
            const container = document.getElementById('leaderboard-container');
            if (leaderboard.length === 0) {
                container.innerHTML = '<h3>Leaderboard</h3><p>No scores yet.</p>';
                return;
            }
            container.innerHTML = `
                <h3>Current Leaderboard</h3>
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
        // Don't overwrite HTML - elements are already in view.php
        // Just attach event listeners to existing elements
        
        console.log('Initializing student app...');
        
        // Student automatically joins session when connecting
        // The WebSocket server handles this in the connection handler

        let currentQuestion = null;
        let selectedAnswer = null;
        let timerInterval = null;
        
        // Update waiting message
        const waitingMsg = document.getElementById('waiting-message');
        if (waitingMsg) {
            waitingMsg.textContent = 'Waiting for teacher to start quiz session...';
        }

        // Listen for session created
        socket.on('session:created', (data) => {
            console.log('Session created, waiting for questions...');
            const waitingMsg = document.getElementById('waiting-message');
            if (waitingMsg) {
                waitingMsg.textContent = 'Session started! Waiting for question...';
                waitingMsg.style.background = '#d1ecf1';
                waitingMsg.style.color = '#0c5460';
            }
        });

        // Listen for new questions
        socket.on('question:new', (data) => {
            console.log('New question received:', data);
            currentQuestion = data.question;
            selectedAnswer = null;
            const questionNumber = data.questionNumber || 1;
            
            const questionNumEl = document.getElementById('question-number');
            const waitingMsg = document.getElementById('waiting-message');
            const questionContainer = document.getElementById('question-container');
            const resultContainer = document.getElementById('result-container');
            const comparisonContainer = document.getElementById('question-comparison-container');
            
            if (questionNumEl) questionNumEl.textContent = `Question ${questionNumber}`;
            if (waitingMsg) waitingMsg.style.display = 'none';
            if (questionContainer) questionContainer.style.display = 'block';
            if (resultContainer) resultContainer.style.display = 'none';
            if (comparisonContainer) comparisonContainer.style.display = 'none';
            
            displayQuestion(data.question, data.timer || 60);
        });

        // Display question (Kahoot-style for students)
        function displayQuestion(question, timer) {
            // Handle different question formats
            const questionText = question.text || question.question || question.question_text || '';
            const questionTextEl = document.getElementById('question-text');
            if (questionTextEl) {
                questionTextEl.textContent = questionText;
            }
            
            const choicesContainer = document.getElementById('choices');
            if (!choicesContainer) {
                console.error('choices container not found!');
                return;
            }
            
            const choices = Array.isArray(question.choices) ? question.choices : [];
            console.log('Choices:', choices);
            
            // Kahoot colors: red, blue, yellow, green
            const kahootColors = [
                { bg: '#DB524D', border: '#C73E39', hover: '#E86560', text: 'white' }, // Red
                { bg: '#4A90E2', border: '#357ABD', hover: '#5BA0F2', text: 'white' }, // Blue
                { bg: '#F5A623', border: '#D68910', hover: '#FFB633', text: 'white' }, // Yellow
                { bg: '#7ED321', border: '#6BB01A', hover: '#8EE331', text: 'white' }  // Green
            ];
            
            choicesContainer.innerHTML = choices.map((choice, index) => {
                const color = kahootColors[index % 4];
                const choiceText = typeof choice === 'string' ? choice : (choice.text || choice);
                return `
                    <div class="kahoot-choice-student" 
                         data-index="${index}"
                         style="background: ${color.bg}; 
                                border: 4px solid ${color.border}; 
                                color: ${color.text}; 
                                padding: 30px 20px; 
                                border-radius: 12px; 
                                font-size: 24px; 
                                font-weight: bold; 
                                text-align: center; 
                                cursor: pointer;
                                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                                transition: all 0.2s;
                                position: relative;">
                        <div style="font-size: 48px; margin-bottom: 10px;">${String.fromCharCode(65 + index)}</div>
                        <div>${choiceText}</div>
                    </div>
                `;
            }).join('');

            // Handle choice selection - auto submit when selected, no changes allowed
            choicesContainer.querySelectorAll('.kahoot-choice-student').forEach(choiceEl => {
                choiceEl.addEventListener('click', (e) => {
                    // Check if already submitted
                    if (selectedAnswer !== null) {
                        return; // Already selected, can't change
                    }
                    
                    // Select this one
                    const index = parseInt(choiceEl.getAttribute('data-index'));
                    const color = kahootColors[index % 4];
                    choiceEl.style.transform = 'scale(1.05)';
                    choiceEl.style.boxShadow = `0 6px 12px rgba(0,0,0,0.3), 0 0 0 4px ${color.border}`;
                    choiceEl.classList.add('selected');
                    selectedAnswer = index;
                    
                    // Disable all choices immediately after selection
                    choicesContainer.querySelectorAll('.kahoot-choice-student').forEach(el => {
                        el.style.pointerEvents = 'none';
                        if (el !== choiceEl) {
                            el.style.opacity = '0.5';
                        }
                    });
                    
                    // Auto-submit after selection with a short delay
                    setTimeout(() => {
                        submitAnswer();
                    }, 500);
                });
            });

            // Start timer with config time limit
            const timeLimit = config.timeLimitPerQuestion || timer || 60;
            let remaining = timeLimit;
            const timerEl = document.getElementById('timer');
            if (timerEl) {
                timerEl.textContent = `${remaining}s`;
                timerEl.style.color = '#007bff';
                timerEl.style.background = '#e7f3ff';
            }
            
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                remaining--;
                if (timerEl) {
                    timerEl.textContent = `${remaining}s`;
                    if (remaining <= 10) {
                        timerEl.style.color = '#dc3545';
                        timerEl.style.background = '#f8d7da';
                    }
                if (remaining <= 0) {
                    clearInterval(timerInterval);
                        timerEl.textContent = 'Time\'s Up!';
                        timerEl.style.color = '#721c24';
                        timerEl.style.background = '#f8d7da';
                    submitAnswer();
                    }
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
            
            const timerEl = document.getElementById('timer');
            const timerText = timerEl ? timerEl.textContent : '0s';
            const timeMatch = timerText.match(/\d+/);
            const timeSpent = timeMatch ? 60 - parseInt(timeMatch[0]) : 0;

            socket.emit('student:submit_answer', {
                questionId: currentQuestion.id,
                answerIndex: selectedAnswer,
                timeSpent: timeSpent
            });

            // Disable choices after submission
            const choicesContainer = document.getElementById('choices');
            if (choicesContainer) {
                choicesContainer.querySelectorAll('.kahoot-choice-student').forEach(el => {
                    el.style.pointerEvents = 'none';
                    el.style.opacity = '0.7';
                });
            }
            
            // Hide submit button after submission
            const submitBtn = document.getElementById('student-submit-btn');
            if (submitBtn) {
                submitBtn.style.display = 'none';
            }
            
            // Clear timer
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        }

        // Add submit button event listener only if it exists
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', submitAnswer);
        }

        // Track student's previous score for comparison
        let previousScore = 0;
        let currentTotalScore = 0;

        // Listen for answer result - just update score silently, keep same UI
        socket.on('answer:result', (data) => {
            const questionScore = data.questionScore || 0;
            currentTotalScore = data.totalScore || currentTotalScore;
            previousScore = currentTotalScore;
            
            // Don't change UI - student stays on the same question view
            // Just silently update the score for internal tracking
        });
        
        // Listen for final leaderboard
        socket.on('leaderboard:final', (data) => {
            const container = document.getElementById('final-leaderboard-container');
            if (!container) return;
            
            const leaderboard = data.leaderboard || [];
            const topN = config.leaderboardTopN || 3;
            const topPlayers = leaderboard.slice(0, topN);
            
            container.style.display = 'block';
            container.innerHTML = `
                <h2 style="margin-top: 0; text-align: center; font-size: 32px; color: white;">🏆 Final Leaderboard 🏆</h2>
                <div style="display: flex; justify-content: center; align-items: flex-end; gap: 20px; margin-top: 30px;">
                    ${topPlayers.map((entry, index) => {
                        const rank = index + 1;
                        const height = rank === 1 ? '120px' : rank === 2 ? '100px' : '80px';
                        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
                        return `
                            <div style="text-align: center; flex: 1; max-width: 200px;">
                                <div style="font-size: 48px; margin-bottom: 10px;">${medal}</div>
                                <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; height: ${height}; display: flex; flex-direction: column; justify-content: center;">
                                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px; color: white;">${entry.username || 'User ' + entry.userId}</div>
                                    <div style="font-size: 24px; font-weight: bold; color: white;">${entry.score || 0} pts</div>
                                </div>
                                <div style="margin-top: 10px; font-size: 18px; font-weight: bold; color: white;">#${rank}</div>
                </div>
                        `;
                    }).join('')}
                </div>
                ${leaderboard.length > topN ? `
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.3);">
                        <h3 style="text-align: center; color: white;">Other Participants</h3>
                        <ol style="list-style: none; padding: 0;">
                            ${leaderboard.slice(topN).map((entry, index) => `
                                <li style="padding: 10px; margin: 5px 0; background: rgba(255,255,255,0.1); border-radius: 4px; color: white;">
                                    #${topN + index + 1} - ${entry.username || 'User ' + entry.userId}: ${entry.score || 0} pts
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                ` : ''}
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

