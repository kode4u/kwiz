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
        // Shared cache for user details (accessible by both teacher and student apps)
        let userDetailsCache = {};
        
        // Shared helper function to get user display name
        function getUserDisplayName(entry) {
            // Try different possible field names for user ID
            let userId = entry.userId || entry.user_id || entry.userid || entry.id;
            
            // Normalize userId to number for cache lookup
            if (userId) {
                userId = parseInt(userId);
            }
            
            // Try lookup with number first
            if (userId && !isNaN(userId)) {
                if (userDetailsCache[userId]) {
                    const user = userDetailsCache[userId];
                    const name = user.fullname || (user.firstname + ' ' + user.lastname) || user.username;
                    if (name && name.trim()) {
                        return name;
                    }
                }
                
                // Try lookup with string version too (in case cache has string keys)
                if (userDetailsCache[String(userId)]) {
                    const user = userDetailsCache[String(userId)];
                    const name = user.fullname || (user.firstname + ' ' + user.lastname) || user.username;
                    if (name && name.trim()) {
                        return name;
                    }
                }
            }
            
            // If we have fullname or username in entry, use that (but prefer cache)
            // Only use entry.username if it's not a generic "User X" format
            if (entry.fullname && entry.fullname.trim() && !entry.fullname.match(/^User \d+$/)) {
                return entry.fullname;
            }
            if (entry.username && entry.username.trim() && !entry.username.match(/^User \d+$/)) {
                return entry.username;
            }
            
            // Last resort
            return 'User ' + (userId || '?');
        }
        
        // Shared function to fetch user details from Moodle
        async function fetchUserDetails(userIds) {
            // Filter out invalid IDs and ensure they're numbers
            const validIds = userIds.filter(id => id && !isNaN(id) && id > 0).map(id => parseInt(id));
            if (validIds.length === 0) {
                return userDetailsCache;
            }
            
            // Check cache with both number and string keys
            const uncachedIds = validIds.filter(id => {
                return !userDetailsCache[id] && !userDetailsCache[String(id)];
            });
            
            if (uncachedIds.length === 0) {
                return userDetailsCache;
            }
            
            try {
                const wwwroot = config.wwwroot || '';
                const sesskey = config.sesskey || '';
                const url = `${wwwroot}/mod/gamifiedquiz/ajax/get_user_details.php?sesskey=${sesskey}&userids=${JSON.stringify(uncachedIds)}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    return userDetailsCache;
                }
                
                const responseText = await response.text();
                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    return userDetailsCache;
                }
                
                if (data.success && data.users) {
                    // Update cache - ensure keys are numbers
                    Object.keys(data.users).forEach(key => {
                        const numKey = parseInt(key);
                        if (!isNaN(numKey)) {
                            userDetailsCache[numKey] = data.users[key];
                            userDetailsCache[String(numKey)] = data.users[key];
                        }
                    });
                    // Update global reference
                    window.gamifiedQuizUserDetailsCache = userDetailsCache;
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
            
            return userDetailsCache;
        }

        // Initialize Socket.IO connection (declare at function scope)
        let socket = null;
        
        try {
            if (typeof io === 'undefined') {
                console.error('Socket.IO not loaded. Please check if the library is available.');
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger gq-container';
                errorDiv.style.cssText = 'background: #f8d7da; border: 1px solid #dc3545; color: #721c24; margin: 10px;';
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
        
        // Make functions available globally for showSessionResults
        window.gamifiedQuizFetchUserDetails = fetchUserDetails;
        window.gamifiedQuizUserDetailsCache = userDetailsCache;
        window.gamifiedQuizGetUserDisplayName = getUserDisplayName;

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
        const editQuestionsBtn = document.getElementById('edit-questions-btn');
        const startBtn = document.getElementById('start-session-btn');
        const endBtn = document.getElementById('end-session-btn');
        const nextBtn = document.getElementById('next-question-btn');
        
        // Function to load scores from database and update leaderboard
        async function loadSessionScores(sessionId) {
            if (!sessionId) return;
            
            try {
                const response = await fetch(`ajax/get_session_scores.php?sessionid=${encodeURIComponent(sessionId)}&quizid=${config.quizId}`);
                const result = await response.json();
                
                if (result.success && result.leaderboard && result.leaderboard.length > 0) {
                    console.log('Loaded scores from database:', result.leaderboard);
                    currentLeaderboard = result.leaderboard;
                    
                    // Update leaderboard display
                    await displayLeaderboard(result.leaderboard);
                    
                    // Emit to WebSocket server to sync Redis
                    if (socket && socket.connected) {
                        socket.emit('teacher:sync_scores', {
                            sessionId: sessionId,
                            leaderboard: result.leaderboard
                        });
                    }
                } else {
                    console.log('No scores found in database for session:', sessionId);
                    currentLeaderboard = [];
                    await displayLeaderboard([]);
                }
            } catch (error) {
                console.error('Error loading session scores:', error);
            }
        }
        
        // Check if there's an active session on page load and load scores
        // This handles page reloads - check for active session in database
        (async function checkActiveSession() {
            try {
                // Get latest session for this quiz
                const response = await fetch(`ajax/get_sessions.php?quizid=${config.quizId}`);
                const result = await response.json();
                
                if (result.success && result.sessions && result.sessions.length > 0) {
                    // Find the most recent active session (started but not ended)
                    const activeSession = result.sessions.find(s => s.started && !s.timeended);
                    
                    if (activeSession) {
                        console.log('Found active session on page load:', activeSession.session_id);
                        currentSessionInstanceId = activeSession.session_id;
                        
                        // Load scores from database
                        await loadSessionScores(activeSession.session_id);
                        
                        // Update UI to show session is active
                        const statusEl = document.getElementById('session-status');
                        if (statusEl) {
                            statusEl.style.display = 'block';
                            statusEl.textContent = `Session active - ID: ${activeSession.session_id.slice(-8)}`;
                            statusEl.style.background = '#d1ecf1';
                        }
                        
                        if (startBtn) startBtn.disabled = true;
                        if (endBtn) endBtn.disabled = false;
                        if (nextBtn) nextBtn.disabled = false;
                    }
                }
            } catch (error) {
                console.error('Error checking for active session:', error);
            }
        })();
        
        if (!generateBtn) {
            console.error('Generate questions button not found!');
            return;
        }
        
        // Edit Questions button handler
        if (editQuestionsBtn) {
            editQuestionsBtn.addEventListener('click', () => {
                console.log('Edit Questions button clicked');
                console.log('questions array:', questions);
                console.log('window.currentQuestions:', window.currentQuestions);
                
                // Check both questions array and window.currentQuestions
                const questionsToEdit = questions.length > 0 ? questions : (window.currentQuestions || []);
                
                if (questionsToEdit.length === 0) {
                    alert('No questions to edit. Please generate questions first.');
                    return;
                }
                
                console.log('Opening editor with questions:', questionsToEdit);
                openQuestionEditor(questionsToEdit, config);
            });
        } else {
            console.error('Edit Questions button not found!');
        }

        let questions = [];
        let currentQuestionIndex = 0;

        // Question Editor Functions (define early for hoisting)
        let selectedQuestionsFromBank = [];
        
        async function loadQuestionBankCategories(config) {
            const categorySelect = document.getElementById('question-category-select');
            const questionList = document.getElementById('question-bank-list');
            
            if (!categorySelect || !questionList) {
                console.error('Question bank elements not found');
                return;
            }
            
            try {
                const url = `${config.wwwroot}/mod/gamifiedquiz/ajax/get_question_bank.php?quizid=${config.quizId}&cmid=${config.cmId}&sesskey=${config.sesskey}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.success) {
                    // Populate category select
                    categorySelect.innerHTML = '<option value="0">-- Select Category --</option>';
                    data.categories.forEach(cat => {
                        const option = document.createElement('option');
                        option.value = cat.id;
                        option.textContent = cat.name;
                        categorySelect.appendChild(option);
                    });
                    
                    // Handle category change
                    categorySelect.onchange = () => {
                        const categoryId = categorySelect.value;
                        if (categoryId > 0) {
                            loadQuestionsFromCategory(categoryId, config);
                        } else {
                            questionList.innerHTML = '<p style="text-align: center; color: #666;">Select a category to view questions</p>';
                        }
                    };
                    
                    // Refresh button
                    const refreshBtn = document.getElementById('refresh-categories-btn');
                    if (refreshBtn) {
                        refreshBtn.onclick = () => loadQuestionBankCategories(config);
                    }
                } else {
                    console.error('Failed to load categories:', data.error);
                    categorySelect.innerHTML = '<option value="0">Error loading categories</option>';
                }
            } catch (error) {
                console.error('Error loading question bank:', error);
                categorySelect.innerHTML = '<option value="0">Error loading categories</option>';
            }
        }
        
        async function loadQuestionsFromCategory(categoryId, config) {
            const questionList = document.getElementById('question-bank-list');
            
            if (!questionList) return;
            
            questionList.innerHTML = '<p style="text-align: center; color: #666;">Loading questions...</p>';
            
            try {
                const url = `${config.wwwroot}/mod/gamifiedquiz/ajax/get_question_bank.php?quizid=${config.quizId}&cmid=${config.cmId}&categoryid=${categoryId}&sesskey=${config.sesskey}`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.success && data.questions) {
                    if (data.questions.length === 0) {
                        questionList.innerHTML = '<p style="text-align: center; color: #666;">No questions found in this category</p>';
                        return;
                    }
                    
                    questionList.innerHTML = '';
                    data.questions.forEach((q, index) => {
                        const questionItem = document.createElement('div');
                        questionItem.className = 'question-bank-item';
                        questionItem.style.cssText = 'border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px; background: white;';
                        
                        const isSelected = selectedQuestionsFromBank.some(sq => sq.id === q.id);
                        
                        questionItem.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <strong>Question ${index + 1}:</strong>
                                    <p style="margin: 8px 0; color: #333;">${q.question || q.question_text || ''}</p>
                                    <div style="margin-top: 10px;">
                                        <strong>Choices:</strong>
                                        <ul style="margin: 5px 0; padding-left: 20px;">
                                            ${(q.choices || []).map((choice, ci) => {
                                                const choiceText = typeof choice === 'string' ? choice : (choice.text || '');
                                                const isCorrect = typeof choice === 'object' ? choice.is_correct : (ci === q.correct_index);
                                                return `<li style="color: ${isCorrect ? '#28a745' : '#666'}; font-weight: ${isCorrect ? 'bold' : 'normal'};">${choiceText} ${isCorrect ? '✓' : ''}</li>`;
                                            }).join('')}
                                        </ul>
                                    </div>
                                </div>
                                <button type="button" class="select-question-btn gq-btn gq-btn-sm ${isSelected ? 'gq-btn-secondary' : 'gq-btn-primary'}" 
                                        data-question-id="${q.id}" 
                                        style="margin-left: 15px; min-width: 100px;">
                                    ${isSelected ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        `;
                        
                        const selectBtn = questionItem.querySelector('.select-question-btn');
                        selectBtn.onclick = () => {
                            if (isSelected) {
                                // Remove from selected
                                selectedQuestionsFromBank = selectedQuestionsFromBank.filter(sq => sq.id !== q.id);
                                selectBtn.textContent = 'Select';
                                selectBtn.className = 'select-question-btn gq-btn gq-btn-sm gq-btn-primary';
                            } else {
                                // Add to selected
                                selectedQuestionsFromBank.push(q);
                                selectBtn.textContent = 'Selected';
                                selectBtn.className = 'select-question-btn gq-btn gq-btn-sm gq-btn-secondary';
                            }
                            updateSelectedQuestionsInEditor(config);
                        };
                        
                        questionList.appendChild(questionItem);
                    });
                } else {
                    questionList.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading questions</p>';
                }
            } catch (error) {
                console.error('Error loading questions from category:', error);
                questionList.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading questions</p>';
            }
        }
        
        function openQuestionEditor(questionsList, config) {
            console.log('openQuestionEditor called with:', questionsList);
            const modal = document.getElementById('question-editor-modal');
            const form = document.getElementById('question-editor-form');
            
            if (!modal) {
                console.error('Question editor modal not found! Modal element:', modal);
                alert('Error: Question editor modal not found. Please refresh the page.');
                return;
            }
            
            if (!form) {
                console.error('Question editor form not found! Form element:', form);
                alert('Error: Question editor form not found. Please refresh the page.');
                return;
            }
            
            console.log('Showing modal');
            modal.style.display = 'flex'; // Use flex to match other modals (like generate-questions-modal)
            
            // Use provided questions or current questions
            const qList = questionsList && questionsList.length > 0 ? questionsList : (window.currentQuestions || []);
            
            // Hide question bank section (we're not using Moodle question bank anymore)
            const bankSection = document.getElementById('question-bank-section');
            if (bankSection) {
                bankSection.style.display = 'none';
            }
            
            // Load existing questions into editor
            form.innerHTML = '';
            if (qList.length > 0) {
            qList.forEach((q, index) => {
                addQuestionToEditor(form, q, index);
            });
            } else {
                form.innerHTML = '<p style="text-align: center; color: #666;">No questions to edit. Please generate questions first.</p>';
            }
            
            // Add "Add New Question" button handler
            const addNewBtn = document.getElementById('add-new-question-btn');
            if (addNewBtn) {
                addNewBtn.onclick = () => {
                    const currentCount = form.querySelectorAll('.question-editor-item').length;
                    addQuestionToEditor(form, null, currentCount);
                };
            }
            
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
                saveBtn.onclick = () => {
                    saveQuestions(config);
                };
            }
        }
        
        function updateSelectedQuestionsInEditor(config) {
            const form = document.getElementById('question-editor-form');
            if (!form) return;
            
            // Get manually added questions (those not from bank)
            const existingItems = form.querySelectorAll('.question-editor-item');
            const manualQuestions = [];
            existingItems.forEach(item => {
                const qText = item.querySelector('.question-text-input')?.value.trim();
                if (qText) {
                    const choices = [];
                    const choicesContainer = item.querySelector('.choices-container');
                    if (choicesContainer) {
                        const choiceInputs = choicesContainer.querySelectorAll('.choice-text-input');
                        const correctRadio = item.querySelector('input[type="radio"]:checked');
                        let correctIndex = 0;
                        
                        choiceInputs.forEach((input, ci) => {
                            const choiceText = input.value.trim();
                            if (choiceText) {
                                choices.push({
                                    text: choiceText,
                                    is_correct: (correctRadio && parseInt(correctRadio.value) === ci)
                                });
                                if (correctRadio && parseInt(correctRadio.value) === ci) {
                                    correctIndex = ci;
                                }
                            }
                        });
                        
                        if (choices.length > 0) {
                            manualQuestions.push({
                                question: qText,
                                question_text: qText,
                                choices: choices,
                                correct_index: correctIndex
                            });
                        }
                    }
                }
            });
            
            // Clear form
            form.innerHTML = '';
            
            // Combine bank questions and manual questions
            const allQuestions = [...selectedQuestionsFromBank, ...manualQuestions];
            
            if (allQuestions.length > 0) {
                allQuestions.forEach((q, index) => {
                    addQuestionToEditor(form, q, index);
                });
            } else {
                form.innerHTML = '<p style="text-align: center; color: #666;">No questions selected. Select questions from the bank above or add new questions below.</p>';
            }
        }
        
        function addQuestionToEditor(form, question, index) {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-editor-item gq-container';
            questionDiv.style.margin = '15px 0';
            
            const qText = question ? (question.question || question.question_text || '') : '';
            const choices = question ? (question.choices || []) : [];
            const correctIndex = question ? (question.correct_index || 0) : 0;
            
            questionDiv.innerHTML = `
                <h4>Question ${index + 1}</h4>
                <label>Question Text:</label>
                <textarea class="question-text-input" rows="3" style="width: 100%; margin-bottom: 10px;">${qText}</textarea>
                <label>Choices:</label>
                <div class="choices-container" data-question-index="${index}"></div>
                <button type="button" class="add-choice-btn gq-btn gq-btn-sm gq-btn-primary" data-index="${index}">Add Choice</button>
                <button type="button" class="remove-question-btn gq-btn gq-btn-sm gq-btn-danger" data-index="${index}">Remove Question</button>
            `;
            
            form.appendChild(questionDiv);
            
            const choicesContainer = questionDiv.querySelector('.choices-container');
            
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
            choiceDiv.innerHTML = `
                <input type="radio" name="correct-${qIndex}" ${isCorrect ? 'checked' : ''} value="${cIndex}">
                <input type="text" class="choice-text-input" value="${text}" placeholder="Choice text">
                <button type="button" class="remove-choice-btn gq-btn gq-btn-sm gq-btn-danger">Remove</button>
            `;
            
            const removeBtn = choiceDiv.querySelector('.remove-choice-btn');
            removeBtn.onclick = () => choiceDiv.remove();
            
            container.appendChild(choiceDiv);
        }
        
        function saveQuestions(config) {
            const modal = document.getElementById('question-editor-modal');
            const form = document.getElementById('question-editor-form');
            if (!form) {
                alert('Error: Question editor form not found');
                return;
            }
            const questionItems = form.querySelectorAll('.question-editor-item');
            
            const savedQuestions = [];
            
            questionItems.forEach((item, qIndex) => {
                const qText = item.querySelector('.question-text-input').value.trim();
                if (!qText) return;
                
                const choices = [];
                // Find choices container
                const choicesContainer = item.querySelector('.choices-container');
                if (!choicesContainer) {
                    console.error('Choices container not found for question', qIndex);
                    return;
                }
                const choiceInputs = choicesContainer.querySelectorAll('.choice-text-input');
                // Find checked radio by looking for any checked correct radio in this item
                const correctRadio = item.querySelector('input[type="radio"]:checked');
                
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
                if (!confirm('No valid questions found. Save empty question list?')) {
                    return;
                }
            }
            
            console.log('Saving questions:', savedQuestions);
            // Save via AJAX
            saveQuestionsToServer(savedQuestions, config);
        }
        
        async function saveQuestionsToServer(questionsToSave, config) {
            try {
                const wwwroot = config.wwwroot || '';
                const sesskey = config.sesskey || '';
                const url = wwwroot + '/mod/gamifiedquiz/ajax/save_questions.php';
                
                console.log('Saving to server:', questionsToSave);
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `quizid=${config.quizId}&cmid=${config.cmId}&sesskey=${sesskey}&questions=${encodeURIComponent(JSON.stringify(questionsToSave))}`
                });
                
                const data = await response.json();
                console.log('Server response:', data);
                
                if (data.success) {
                    alert('Questions saved successfully!');
                    document.getElementById('question-editor-modal').style.display = 'none';
                    // Update the outer questions array
                    questions.length = 0;
                    (data.questions || questionsToSave).forEach(q => questions.push(q));
                    window.currentQuestions = questions;
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
        
        // Multi-Category Generation functionality
        let categories = []; // Array of {name, topic, difficulty, count}
        
        function initMultiCategoryGeneration() {
            const modal = document.getElementById('generate-questions-modal');
            const addCategoryBtn = document.getElementById('add-category-btn');
            const generateAllBtn = document.getElementById('generate-all-btn');
            const cancelBtn = document.getElementById('cancel-generate-btn');
            const closeBtn = modal ? modal.querySelector('.generate-questions-close') : null;
            const categoryList = document.getElementById('category-list');
            
            if (!modal || !addCategoryBtn || !generateAllBtn) {
                console.error('Multi-category generation elements not found');
                return;
            }
            
            // Add category button
            addCategoryBtn.addEventListener('click', () => {
                addCategoryRow();
            });
            
            // Generate all button
            generateAllBtn.addEventListener('click', async () => {
                await generateAllCategories(config);
            });
            
            // Cancel/Close buttons
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                    categories = [];
                });
            }
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                    categories = [];
                });
            }
            
            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    categories = [];
                }
            });
            
            // Add initial category
            addCategoryRow();
        }
        
        function addCategoryRow() {
            const categoryList = document.getElementById('category-list');
            if (!categoryList) return;
            
            const categoryIndex = categories.length;
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-row gq-container';
            categoryDiv.style.marginBottom = '15px';
            categoryDiv.style.padding = '15px';
            categoryDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 10px; align-items: center;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Category Name:</label>
                        <input type="text" class="category-name-input" placeholder="e.g., Variables" 
                               style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" 
                               value="Category ${categoryIndex + 1}">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Topic:</label>
                        <input type="text" class="category-topic-input" placeholder="Topic" 
                               style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
                               value="${config.topic || ''}">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Difficulty:</label>
                        <select class="category-difficulty-input" 
                                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="easy" ${config.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                            <option value="medium" ${config.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="hard" ${config.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Count:</label>
                        <select class="category-count-input" 
                                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="3">3</option>
                            <option value="5" selected>5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <div>
                        <button type="button" class="remove-category-btn btn btn-danger gq-btn gq-btn-danger" 
                                style="margin-top: 25px;">Remove</button>
                    </div>
                </div>
            `;
            
            categoryList.appendChild(categoryDiv);
            
            // Remove button handler
            const removeBtn = categoryDiv.querySelector('.remove-category-btn');
            removeBtn.addEventListener('click', () => {
                categoryDiv.remove();
            });
        }
        
        async function generateAllCategories(config) {
            const categoryList = document.getElementById('category-list');
            if (!categoryList) return;
            
            // Collect all categories
            categories = [];
            const categoryRows = categoryList.querySelectorAll('.category-row');
            
            categoryRows.forEach(row => {
                const name = row.querySelector('.category-name-input')?.value.trim() || 'Default';
                const topic = row.querySelector('.category-topic-input')?.value.trim() || config.topic || '';
                const difficulty = row.querySelector('.category-difficulty-input')?.value || config.difficulty || 'medium';
                const count = parseInt(row.querySelector('.category-count-input')?.value || '5');
                
                if (topic) {
                    categories.push({ name, topic, difficulty, count });
                }
            });
            
            if (categories.length === 0) {
                alert('Please add at least one category with a topic.');
                return;
            }
            
            // Show loading
            const loadingModal = document.getElementById('loading-modal');
            const generateModal = document.getElementById('generate-questions-modal');
            if (loadingModal) loadingModal.style.display = 'flex';
            if (generateModal) generateModal.style.display = 'none';
            
            // Generate questions for each category
            const allQuestions = [];
            const wwwroot = config.wwwroot || '';
            const sesskey = config.sesskey || '';
            
            try {
                for (const category of categories) {
                    const formData = new URLSearchParams();
                    formData.append('quizid', config.quizId);
                    formData.append('cmid', config.cmId);
                    formData.append('sesskey', sesskey);
                    formData.append('prompt', category.topic);
                    formData.append('difficulty', category.difficulty);
                    formData.append('count', category.count);
                    formData.append('category_name', category.name);
                    
                    const response = await fetch(wwwroot + '/mod/gamifiedquiz/ajax/generate.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: formData.toString()
                    });
                    
                    const data = await response.json();
                    
                    if (data.success && data.questions) {
                        // Add category name to each question
                        data.questions.forEach(q => {
                            q.category_name = category.name;
                        });
                        allQuestions.push(...data.questions);
                    } else {
                        console.error('Failed to generate questions for category:', category.name, data.error);
                    }
                }
                
                // Hide loading
                if (loadingModal) loadingModal.style.display = 'none';
                
                if (allQuestions.length > 0) {
                    questions = allQuestions;
                    window.currentQuestions = questions;
                    if (startBtn) startBtn.disabled = false;
                    currentQuestionIndex = 0;
                    
                    const statusEl = document.getElementById('session-status');
                    if (statusEl) {
                        statusEl.style.display = 'block';
                        statusEl.textContent = `Generated ${allQuestions.length} questions from ${categories.length} categories. Ready to start session.`;
                        statusEl.style.background = '#d4edda';
                        statusEl.style.borderColor = '#28a745';
                    }
                } else {
                    alert('Failed to generate questions. Please check your LLM API configuration.');
                }
            } catch (error) {
                console.error('Error generating questions:', error);
                if (loadingModal) loadingModal.style.display = 'none';
                alert('Error generating questions: ' + error.message);
            }
        }
        
        // Initialize multi-category generation when generate button is clicked
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                const modal = document.getElementById('generate-questions-modal');
                if (modal) {
                    modal.style.display = 'flex';
                    initMultiCategoryGeneration();
                }
            });
        }
        
        // Helper function to auto-calculate correct_index from is_correct
        function normalizeQuestion(q) {
            if (!q.correct_index && q.choices && Array.isArray(q.choices)) {
                // Find the index of the choice with is_correct = true
                for (let i = 0; i < q.choices.length; i++) {
                    const choice = q.choices[i];
                    if (typeof choice === 'object' && choice.is_correct === true) {
                        q.correct_index = i;
                        break;
                    }
                }
                // Default to 0 if no correct answer found
                if (q.correct_index === undefined) {
                    q.correct_index = 0;
                }
            }
            return q;
        }
        
        // Check for edited questions
        if (config.questionsData) {
            try {
                const edited = JSON.parse(config.questionsData);
                if (Array.isArray(edited) && edited.length > 0) {
                    // Normalize questions to ensure correct_index is set
                    questions = edited.map(normalizeQuestion);
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

        // Current session instance ID
        let currentSessionInstanceId = null;
        // Track leaderboard for saving
        let currentLeaderboard = [];
        
        // Start session
        startBtn.addEventListener('click', async () => {
            if (questions.length === 0) {
                alert('Please generate questions first!');
                return;
            }
            if (!socket || !socket.connected) {
                alert('WebSocket not connected. Please check your connection and refresh the page.');
                return;
            }
            
            // RESET scores and leaderboard for new session
            currentLeaderboard = [];
            if (window.gamifiedQuizUserDetailsCache) {
                window.gamifiedQuizUserDetailsCache = {}; // Clear user cache for fresh start
            }
            currentQuestionIndex = 0;
            
            // Create session in database first
            try {
                const formData = new FormData();
                formData.append('quizid', config.quizId);
                formData.append('questionsdata', JSON.stringify(questions));
                
                const response = await fetch('ajax/session_start.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                
                if (!result.success) {
                    alert('Failed to create session: ' + result.error);
                    return;
                }
                
                currentSessionInstanceId = result.sessionId;
                console.log('Session created in DB:', currentSessionInstanceId);
            } catch (error) {
                console.error('Failed to create session:', error);
                alert('Failed to create session');
                return;
            }
            
            socket.emit('teacher:create_session', {
                session_id: config.sessionId,
                instance_id: currentSessionInstanceId,
                quizId: config.quizId,
                questions: questions
            });
            if (startBtn) startBtn.disabled = true;
            if (endBtn) endBtn.disabled = false;
            if (nextBtn) nextBtn.disabled = false;
            currentQuestionIndex = 0;
            const statusEl = document.getElementById('session-status');
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.textContent = `Session started! ID: ${currentSessionInstanceId.slice(-8)}`;
                statusEl.style.background = '#d1ecf1';
                statusEl.style.borderColor = '#0c5460';
            }
            
            // Clear leaderboard display
            const leaderboardContainer = document.getElementById('leaderboard-container');
            if (leaderboardContainer) {
                leaderboardContainer.innerHTML = '<h3>🏆 Current Leaderboard</h3><p>Waiting for students to answer...</p>';
            }
            
            // Clear ranking display
            const rankingContainer = document.getElementById('question-ranking-display');
            if (rankingContainer) {
                rankingContainer.style.display = 'none';
            }
            
            // Clear any cached leaderboard data
            currentLeaderboard = [];
            if (window.gamifiedQuizUserDetailsCache) {
                window.gamifiedQuizUserDetailsCache = {};
            }
            
            // Save session start to database
            saveSessionToDatabase({
                instanceId: currentSessionInstanceId,
                quizId: config.quizId,
                questions: questions,
                startedAt: Math.floor(Date.now() / 1000)
            });
            
            // Automatically push first question when session starts
            setTimeout(() => {
                pushNextQuestion();
            }, 1000);
        });

        // End session
        if (endBtn) {
            endBtn.addEventListener('click', async () => {
                // Get final leaderboard before ending (load from database to ensure we have latest scores)
                let finalLeaderboard = currentLeaderboard || [];
                let participantCount = finalLeaderboard.length;
                
                try {
                    // Load latest scores from database to ensure we have the most up-to-date leaderboard
                    const scoresResponse = await fetch(`ajax/get_session_scores.php?sessionid=${encodeURIComponent(currentSessionInstanceId)}&quizid=${config.quizId}`);
                    const scoresResult = await scoresResponse.json();
                    if (scoresResult.success) {
                        if (scoresResult.leaderboard && scoresResult.leaderboard.length > 0) {
                            finalLeaderboard = scoresResult.leaderboard;
                            console.log('Loaded final leaderboard from database:', finalLeaderboard);
                        }
                        // Use unique_participants if available, otherwise count from leaderboard
                        if (scoresResult.unique_participants !== undefined && scoresResult.unique_participants > 0) {
                            participantCount = scoresResult.unique_participants;
                        } else if (scoresResult.leaderboard && scoresResult.leaderboard.length > 0) {
                            // Count unique users in leaderboard
                            const uniqueUsers = new Set();
                            scoresResult.leaderboard.forEach(entry => {
                                const userId = entry.userId || entry.user_id || entry.userid || entry.id;
                                if (userId) uniqueUsers.add(userId);
                            });
                            participantCount = uniqueUsers.size || scoresResult.leaderboard.length;
                        } else {
                            // Fallback: use total_responses if available
                            participantCount = scoresResult.total_responses || finalLeaderboard.length;
                        }
                    }
                } catch (error) {
                    console.error('Failed to load final scores:', error);
                    // Fallback: count unique users in current leaderboard
                    const uniqueUsers = new Set();
                    finalLeaderboard.forEach(entry => {
                        const userId = entry.userId || entry.user_id || entry.userid || entry.id;
                        if (userId) uniqueUsers.add(userId);
                    });
                    participantCount = uniqueUsers.size || finalLeaderboard.length;
                }
                
                // End session in database with final leaderboard
                try {
                    const formData = new FormData();
                    formData.append('sessionid', currentSessionInstanceId);
                    formData.append('resultsdata', JSON.stringify(finalLeaderboard));
                    
                    await fetch('ajax/session_end.php', {
                        method: 'POST',
                        body: formData
                    });
                    console.log('Session ended in DB with leaderboard');
                } catch (error) {
                    console.error('Failed to end session in DB:', error);
                }
                
                // Also update session with final results (always save, even if empty)
                try {
                    await updateSessionInDatabase({
                        instanceId: currentSessionInstanceId,
                        participantsCount: participantCount,
                        sessionResults: finalLeaderboard, // Always save, even if empty array
                        endedAt: Math.floor(Date.now() / 1000)
                    });
                    console.log('Session updated with participant count:', participantCount, 'and results:', finalLeaderboard.length);
                } catch (error) {
                    console.error('Failed to update session with results:', error);
                }
                
                socket.emit('teacher:end_session', {
                    instance_id: currentSessionInstanceId
                });
                
                // RESET for next session
                currentLeaderboard = [];
                if (window.gamifiedQuizUserDetailsCache) {
                    window.gamifiedQuizUserDetailsCache = {}; // Clear user cache
                }
                currentQuestionIndex = 0;
                
                // Re-enable start button for new session
                if (startBtn) startBtn.disabled = false;
                if (endBtn) endBtn.disabled = true;
                if (nextBtn) nextBtn.disabled = true;
            });
        }
        
        // Save session to database
        async function saveSessionToDatabase(sessionData) {
            try {
                const formData = new FormData();
                formData.append('quizid', config.quizId);
                formData.append('sessionid', sessionData.instanceId);
                formData.append('sessionname', `Session ${new Date().toLocaleString()}`);
                formData.append('questionsdata', JSON.stringify(sessionData.questions || []));
                formData.append('totalquestions', (sessionData.questions || []).length);
                formData.append('startedat', sessionData.startedAt);
                
                const response = await fetch('ajax/save_session.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                if (result.success) {
                    console.log('Session saved to database:', sessionData.instanceId);
                } else {
                    console.error('Failed to save session:', result.error);
                }
            } catch (error) {
                console.error('Error saving session:', error);
            }
        }

        // Next question button handler is defined after pushNextQuestion function
        
        // Update session in database (for ending session with results)
        async function updateSessionInDatabase(sessionData) {
            try {
                const formData = new FormData();
                formData.append('quizid', config.quizId);
                formData.append('sessionid', sessionData.instanceId);
                formData.append('participantscount', sessionData.participantsCount);
                formData.append('sessionresults', JSON.stringify(sessionData.sessionResults || []));
                formData.append('endedat', sessionData.endedAt);
                
                const response = await fetch('ajax/save_session.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                if (result.success) {
                    console.log('Session results saved:', sessionData.instanceId);
                } else {
                    console.error('Failed to save session results:', result.error);
                }
            } catch (error) {
                console.error('Error saving session results:', error);
            }
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
            
            // Hide previous results and ranking
            const resultsEl = document.getElementById('question-results-display');
            if (resultsEl) resultsEl.style.display = 'none';
            const rankingEl = document.getElementById('question-ranking-display');
            if (rankingEl) rankingEl.style.display = 'none';
            
            // Increment index AFTER pushing
            currentQuestionIndex++;
            
            // Update next button text (but keep it enabled - teacher can proceed anytime)
            if (nextBtn) {
                if (currentQuestionIndex >= questions.length) {
                    nextBtn.textContent = 'End Quiz';
                } else {
                    nextBtn.textContent = 'Next Question';
                }
                // Keep button enabled - teacher can proceed anytime
                nextBtn.disabled = false;
            }
        }
        
        // Next Question button handler
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentQuestionIndex >= questions.length) {
                    // End quiz
                    if (endBtn) {
                        endBtn.click();
                    }
                } else {
                    // Push next question (teacher can proceed anytime)
                pushNextQuestion();
                }
            });
        }
        
        // Listen for question timeout - just log it, button stays enabled
        socket.on('question:timeout', () => {
            console.log('Question timeout - teacher can proceed anytime');
            // Button is already enabled, no need to change state
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

        // Function to load scores from database and update leaderboard
        async function loadSessionScores(sessionId) {
            if (!sessionId) return;
            
            try {
                const response = await fetch(`ajax/get_session_scores.php?sessionid=${encodeURIComponent(sessionId)}&quizid=${config.quizId}`);
                const result = await response.json();
                
                if (result.success && result.leaderboard && result.leaderboard.length > 0) {
                    console.log('Loaded scores from database:', result.leaderboard);
                    currentLeaderboard = result.leaderboard;
                    
                    // Update leaderboard display
                    await displayLeaderboard(result.leaderboard);
                    
                    // Emit to WebSocket server to sync Redis
                    if (socket && socket.connected) {
                        socket.emit('teacher:sync_scores', {
                            sessionId: sessionId,
                            leaderboard: result.leaderboard
                        });
                    }
                } else {
                    console.log('No scores found in database for session:', sessionId);
                    currentLeaderboard = [];
                    await displayLeaderboard([]);
                }
            } catch (error) {
                console.error('Error loading session scores:', error);
            }
        }

        // Listen for session events
        socket.on('session:created', async (data) => {
            const statusEl = document.getElementById('session-status');
            if (statusEl) {
                statusEl.textContent = 'Session active - Students can join';
                statusEl.style.background = '#d1ecf1';
            }
            // RESET scores and leaderboard for new session
            currentLeaderboard = [];
            if (window.gamifiedQuizUserDetailsCache) {
                window.gamifiedQuizUserDetailsCache = {}; // Clear user cache
            }
            // Clear leaderboard for new session
            displayLeaderboard([]).catch(err => console.error('Error clearing leaderboard:', err));
            // Store new instance ID
            currentSessionInstanceId = data.instanceId;
            console.log('New session created with instanceId:', currentSessionInstanceId);
            
            // Load any existing scores from database (in case of page reload)
            await loadSessionScores(currentSessionInstanceId);
        });

        socket.on('session:ended', (data) => {
            const statusEl = document.getElementById('session-status');
            if (statusEl) {
                statusEl.textContent = 'Session ended - Results saved';
                statusEl.style.background = '#d4edda';
            }
            if (endBtn) endBtn.disabled = true;
            if (nextBtn) nextBtn.disabled = true;
            if (startBtn) startBtn.disabled = false; // Re-enable for new session
            const currentQEl = document.getElementById('current-question-display');
            if (currentQEl) currentQEl.style.display = 'none';
            
            // Save final session results to database
            if (data.sessionData && currentSessionInstanceId) {
                updateSessionInDatabase({
                    instanceId: currentSessionInstanceId,
                    participantsCount: data.sessionData.participantsCount || 0,
                    sessionResults: data.finalLeaderboard || [],
                    endedAt: data.sessionData.endedAt || Math.floor(Date.now() / 1000)
                });
            }
            
            // Save session results to database
            if (data.sessionData) {
                saveSessionResults(data.sessionData, data.finalLeaderboard);
            }
        });

        // Track previous scores for comparison
        let previousScores = {};
        let questionResults = [];
        
        // Listen for question results
        socket.on('question:results', async (data) => {
            console.log('Question results received:', data);
            displayQuestionResults(data);
            // Display ranking after each question
            await displayQuestionRanking(data.leaderboard || []);
            // Update next button text (button stays enabled - teacher can proceed anytime)
            if (nextBtn) {
                if (currentQuestionIndex >= questions.length) {
                    nextBtn.textContent = 'End Quiz';
                } else {
                    nextBtn.textContent = 'Next Question';
                }
                // Keep button enabled - teacher can proceed anytime
                nextBtn.disabled = false;
            }
        });
        
        // Function to display ranking after each question
        // Note: getUserDisplayName and fetchUserDetails are defined in startApp scope
        async function displayQuestionRanking(leaderboard) {
            const rankingContainer = document.getElementById('question-ranking-display');
            const rankingTable = document.getElementById('ranking-table-container');
            
            if (!rankingContainer || !rankingTable) return;
            
            // Fetch user details for all users in leaderboard (try different field names)
            const userIds = leaderboard.map(entry => {
                const id = entry.userId || entry.user_id || entry.userid || entry.id;
                return id ? parseInt(id) : null;
            }).filter(id => id && !isNaN(id) && id > 0);
            
            console.log('Question ranking - Extracted user IDs:', userIds);
            
            if (userIds.length > 0 && window.gamifiedQuizFetchUserDetails) {
                await window.gamifiedQuizFetchUserDetails(userIds);
            }
            
            // Sort leaderboard by score (descending)
            const sorted = [...leaderboard].sort((a, b) => (b.score || 0) - (a.score || 0));
            
            rankingContainer.style.display = 'block';
            rankingTable.innerHTML = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                            <th style="padding: 12px; text-align: left; width: 60px;">Rank</th>
                            <th style="padding: 12px; text-align: left;">Student</th>
                            <th style="padding: 12px; text-align: right;">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sorted.map((entry, index) => `
                            <tr style="border-bottom: 1px solid #dee2e6; ${index < 3 ? 'background: #fff3cd; font-weight: bold;' : ''}">
                                <td style="padding: 12px;">
                                    ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1)}
                                </td>
                                <td style="padding: 12px;">${window.gamifiedQuizGetUserDisplayName ? window.gamifiedQuizGetUserDisplayName(entry) : `User ${entry.userId || entry.user_id || entry.userid || entry.id || '?'}`}</td>
                                <td style="padding: 12px; text-align: right; font-weight: bold;">${entry.score || 0} pts</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
        
        // Listen for leaderboard updates
        socket.on('leaderboard:update', async (data) => {
            console.log('Leaderboard update received:', data);
            console.log('Leaderboard data:', data.leaderboard);
            if (data.leaderboard && data.leaderboard.length > 0) {
                currentLeaderboard = data.leaderboard;
                await displayLeaderboard(data.leaderboard);
            } else {
                console.log('No leaderboard data to display');
                currentLeaderboard = [];
                await displayLeaderboard([]);
            }
        });
        
        // Listen for student responses to save to database
        socket.on('response:save', async (data) => {
            console.log('Saving student response to database:', data);
            try {
                const formData = new FormData();
                formData.append('sessionid', data.sessionId);
                formData.append('userid', data.userId);
                formData.append('username', data.username);
                formData.append('questionid', data.questionId);
                formData.append('questiontext', data.questionText || '');
                formData.append('answerindex', data.answerIndex);
                formData.append('iscorrect', data.isCorrect ? 1 : 0);
                formData.append('score', data.score);
                formData.append('timespent', data.timeSpent || 0);
                formData.append('quizid', config.quizId);
                
                const response = await fetch('ajax/save_response.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    console.log('Response saved to database:', result.responseid);
                    
                    // Reload scores from database to get updated leaderboard with accumulated scores
                    // This ensures scores persist across page reloads
                    if (currentSessionInstanceId) {
                        await loadSessionScores(currentSessionInstanceId);
                    }
                } else {
                    console.error('Failed to save response:', result.error);
                }
            } catch (error) {
                console.error('Error saving response to database:', error);
            }
        });
        
        // Add View Past Sessions button
        const viewSessionsBtn = document.createElement('button');
        viewSessionsBtn.className = 'btn btn-secondary gq-btn gq-btn-secondary';
        viewSessionsBtn.style.marginLeft = '10px';
        viewSessionsBtn.textContent = 'View Past Sessions';
        viewSessionsBtn.addEventListener('click', async () => {
            try {
                const response = await fetch(`ajax/get_sessions.php?quizid=${config.quizId}`);
                const result = await response.json();
                
                if (result.success) {
                    displaySessionsDialog(result.sessions);
                } else {
                    console.error('Failed to load sessions:', result.error);
                    alert('Failed to load session history: ' + (result.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error loading sessions:', error);
                alert('Error loading session history: ' + error.message);
            }
        });
        
        const controlsDiv = document.querySelector('.controls');
        if (controlsDiv) {
            controlsDiv.appendChild(viewSessionsBtn);
        }
        
        // Listen for final leaderboard
        socket.on('leaderboard:final', async (data) => {
            await displayFinalLeaderboard(data.leaderboard || []);
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
        
        // Note: fetchUserDetails is defined in startApp scope and accessible here
        
        async function displayLeaderboard(leaderboard) {
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
            
            // Debug: Log leaderboard entries to see structure
            if (leaderboard.length > 0) {
                console.log('Leaderboard entries structure (first entry):', {
                    keys: Object.keys(leaderboard[0]),
                    fullEntry: leaderboard[0]
                });
            }
            
            // Fetch user details for all users in leaderboard (try different field names)
            const userIds = leaderboard.map(entry => {
                // Try different possible field names
                const id = entry.userId || entry.user_id || entry.userid || entry.id;
                return id ? parseInt(id) : null;
            }).filter(id => id && !isNaN(id) && id > 0);
            
            console.log('Extracted user IDs from leaderboard:', userIds);
            // Use global cache reference
            const userDetailsCache = window.gamifiedQuizUserDetailsCache || {};
            console.log('Current cache state before fetch:', Object.keys(userDetailsCache));
            
            // Fetch user details first
            if (userIds.length > 0) {
                await window.gamifiedQuizFetchUserDetails(userIds);
                // Update local reference after fetch
                const updatedCache = window.gamifiedQuizUserDetailsCache || {};
                console.log('Current cache state after fetch:', Object.keys(updatedCache));
            } else {
                console.warn('No valid user IDs found in leaderboard entries. Full entries:', leaderboard);
            }
            
            const topN = config.leaderboardTopN || 5;
            const topPlayers = leaderboard.slice(0, topN);
            
            console.log('Displaying top players:', topPlayers);
            
            // Render the leaderboard with user names
            container.innerHTML = `
                <h3>🏆 Current Leaderboard</h3>
                <ol style="padding-left: 20px;">
                    ${topPlayers.map((entry, index) => {
                        const rank = index + 1;
                        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
                        const displayName = window.gamifiedQuizGetUserDisplayName ? window.gamifiedQuizGetUserDisplayName(entry) : `User ${entry.userId || entry.user_id || entry.userid || entry.id || '?'}`;
                        const userId = entry.userId || entry.user_id || entry.userid || entry.id;
                        console.log(`Entry ${index}: userId=${userId}, displayName=${displayName}`);
                        return `
                            <li style="padding: 10px; margin: 8px 0; background: ${rank <= 3 ? '#fff3cd' : '#f8f9fa'}; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: bold;">${medal} ${displayName}</span>
                                <span style="font-size: 18px; font-weight: bold; color: #007bff;">${entry.score || 0} pts</span>
                            </li>
                        `;
                    }).join('')}
                </ol>
            `;
        }
        
        async function displayFinalLeaderboard(leaderboard) {
            const container = document.getElementById('final-leaderboard-container');
        if (!container) return;

            // Fetch user details for all users in leaderboard (try different field names)
            const userIds = leaderboard.map(entry => {
                const id = entry.userId || entry.user_id || entry.userid || entry.id;
                return id ? parseInt(id) : null;
            }).filter(id => id && !isNaN(id) && id > 0);
            
            console.log('Final leaderboard - Extracted user IDs:', userIds);
            
            // Fetch user details first
            if (userIds.length > 0 && window.gamifiedQuizFetchUserDetails) {
                await window.gamifiedQuizFetchUserDetails(userIds);
            }

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
                                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">${window.gamifiedQuizGetUserDisplayName ? window.gamifiedQuizGetUserDisplayName(entry) : `User ${entry.userId || entry.user_id || entry.userid || entry.id || '?'}`}</div>
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
                                    #${topN + index + 1} - ${window.gamifiedQuizGetUserDisplayName ? window.gamifiedQuizGetUserDisplayName(entry) : `User ${entry.userId || entry.user_id || entry.userid || entry.id || '?'}`}: ${entry.score || 0} pts
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
                            <strong>${window.gamifiedQuizGetUserDisplayName ? window.gamifiedQuizGetUserDisplayName(entry) : `User ${entry.userId || entry.user_id || entry.userid || entry.id || '?'}`}</strong>: 
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
        console.log('Student config:', config);
        console.log('Student userId:', config.userId);
        console.log('Student userName:', config.userName);
        console.log('Student fullName:', config.fullName);
        
        // Student automatically joins session when connecting
        // The WebSocket server handles this in the connection handler

        let currentQuestion = null;
        let selectedAnswer = null;
        let timerInterval = null;
        let currentTimerDuration = 60;
        
        // Update waiting message
        const waitingMsg = document.getElementById('waiting-message');
        if (waitingMsg) {
            waitingMsg.textContent = 'Waiting for teacher to start quiz session...';
        }

        // Listen for session created
        socket.on('session:created', async (data) => {
            console.log('Session created, waiting for questions...', data);
            
            // RESET student scores for new session
            currentTotalScore = 0;
            previousScore = 0;
            
            // Update participant count in database
            if (data.instanceId) {
                try {
                    const formData = new FormData();
                    formData.append('sessionid', data.instanceId);
                    await fetch('ajax/session_join.php', {
                        method: 'POST',
                        body: formData
                    });
                    console.log('Joined session in DB');
                } catch (error) {
                    console.error('Failed to join session in DB:', error);
                }
            }
            
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
            const leaderboardContainer = document.getElementById('student-leaderboard-container');
            
            if (questionNumEl) questionNumEl.textContent = `Question ${questionNumber}`;
            if (waitingMsg) waitingMsg.style.display = 'none';
            if (questionContainer) questionContainer.style.display = 'block';
            if (resultContainer) resultContainer.style.display = 'none';
            if (comparisonContainer) comparisonContainer.style.display = 'none';
            if (leaderboardContainer) leaderboardContainer.style.display = 'none';
            
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
            currentTimerDuration = timeLimit; // Store for score calculation
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
            const remainingTime = timeMatch ? parseInt(timeMatch[0]) : 0;
            const timerDuration = currentTimerDuration || config.timeLimitPerQuestion || 60;
            const timeSpent = timerDuration - remainingTime;

            const submitData = {
                questionId: currentQuestion.id,
                answerIndex: selectedAnswer,
                timeSpent: timeSpent,
                userId: config.userId,
                fullName: config.fullName || config.userName || 'Unknown'
            };
            console.log('Submitting answer to WebSocket:', submitData);
            socket.emit('student:submit_answer', submitData);

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

        // Listen for answer result - just update score silently
        socket.on('answer:result', (data) => {
            const questionScore = data.questionScore || 0;
            currentTotalScore = data.totalScore || currentTotalScore;
            previousScore = currentTotalScore;
        });
        
        // Helper function to display leaderboard for students
        async function displayStudentLeaderboard(container, leaderboard, isFinal = false) {
            if (!container) return;
            
            // Fetch user details (use global fetchUserDetails if available)
            const userIds = leaderboard.map(entry => {
                const id = entry.userId || entry.user_id || entry.userid || entry.id;
                return id ? parseInt(id) : null;
            }).filter(id => id && !isNaN(id) && id > 0);
            
            if (userIds.length > 0 && window.gamifiedQuizFetchUserDetails) {
                await window.gamifiedQuizFetchUserDetails(userIds);
            }
            
            // Helper to get display name
            function getDisplayName(entry) {
                const userId = entry.userId || entry.user_id || entry.userid || entry.id;
                if (window.gamifiedQuizGetUserDisplayName) {
                    return window.gamifiedQuizGetUserDisplayName(entry);
                }
                // Fallback if getUserDisplayName not available
                if (entry.fullname && !entry.fullname.match(/^User \d+$/)) {
                    return entry.fullname;
                }
                if (entry.username && !entry.username.match(/^User \d+$/)) {
                    return entry.username;
                }
                return `User ${userId || '?'}`;
            }
            
            const topN = config.leaderboardTopN || 3;
            const topPlayers = leaderboard.slice(0, topN);
            
            container.style.display = 'block';
            container.innerHTML = `
                <h2 style="margin-top: 0; text-align: center; font-size: ${isFinal ? '32px' : '28px'}; color: white;">
                    ${isFinal ? '🏆 Final Leaderboard 🏆' : '📊 Current Leaderboard'}
                </h2>
                <div style="display: flex; justify-content: center; align-items: flex-end; gap: 20px; margin-top: 30px;">
                    ${topPlayers.map((entry, index) => {
                        const rank = index + 1;
                        const height = rank === 1 ? '120px' : rank === 2 ? '100px' : '80px';
                        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
                        return `
                            <div style="text-align: center; flex: 1; max-width: 200px;">
                                <div style="font-size: 48px; margin-bottom: 10px;">${medal}</div>
                                <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; height: ${height}; display: flex; flex-direction: column; justify-content: center;">
                                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px; color: white;">${getDisplayName(entry)}</div>
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
                                    #${topN + index + 1} - ${getDisplayName(entry)}: ${entry.score || 0} pts
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                ` : ''}
            `;
        }
        
        // Listen for question timeout - hide quiz UI
        socket.on('question:timeout', () => {
            console.log('Question timeout - hiding quiz UI');
            const questionContainer = document.getElementById('question-container');
            if (questionContainer) {
                questionContainer.style.display = 'none';
            }
        });
        
        // Listen for question results - show leaderboard
        socket.on('question:results', async (data) => {
            console.log('Question results received:', data);
            const leaderboard = data.leaderboard || [];
            
            // Hide quiz UI
            const questionContainer = document.getElementById('question-container');
            if (questionContainer) {
                questionContainer.style.display = 'none';
            }
            
            // Show leaderboard
            const leaderboardContainer = document.getElementById('student-leaderboard-container');
            if (leaderboardContainer) {
                await displayStudentLeaderboard(leaderboardContainer, leaderboard, false);
            }
        });
        
        // Listen for final leaderboard
        socket.on('leaderboard:final', async (data) => {
            const container = document.getElementById('student-final-leaderboard-container');
            const leaderboard = data.leaderboard || [];
            
            // Hide quiz UI and intermediate leaderboard
            const questionContainer = document.getElementById('question-container');
            const leaderboardContainer = document.getElementById('student-leaderboard-container');
            if (questionContainer) questionContainer.style.display = 'none';
            if (leaderboardContainer) leaderboardContainer.style.display = 'none';
            
            if (container) {
                await displayStudentLeaderboard(container, leaderboard, true);
            }
        });

        // Listen for leaderboard updates (students don't see leaderboard during quiz)
        socket.on('leaderboard:update', (data) => {
            const container = document.getElementById('leaderboard-container');
            if (!container) return; // Students don't have leaderboard container
            
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
                            <strong>${window.gamifiedQuizGetUserDisplayName ? window.gamifiedQuizGetUserDisplayName(entry) : `User ${entry.userId || entry.user_id || entry.userid || entry.id || '?'}`}</strong>: 
                            ${entry.score || 0} points
                            ${index < 3 ? ' 🏆' : ''}
                        </li>
                    `).join('')}
                </ol>
            `;
        });

        // Listen for session end
        socket.on('session:ended', (data) => {
            // Clear any running timer
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            
            // Hide quiz UI and intermediate leaderboard
            const questionContainer = document.getElementById('question-container');
            const leaderboardContainer = document.getElementById('student-leaderboard-container');
            if (questionContainer) questionContainer.style.display = 'none';
            if (leaderboardContainer) leaderboardContainer.style.display = 'none';
            
            // Reset student score for this session
            currentTotalScore = 0;
            previousScore = 0;
        });
        
        // Listen for session reset (new session started)
        socket.on('session:reset', (data) => {
            console.log('New session started:', data);
            const waitingMsg = document.getElementById('waiting-message');
            if (waitingMsg) {
                waitingMsg.style.display = 'block';
                waitingMsg.textContent = 'New quiz session started! Waiting for first question...';
            }
            const questionContainer = document.getElementById('question-container');
            const leaderboardContainer = document.getElementById('student-leaderboard-container');
            const finalLeaderboardContainer = document.getElementById('student-final-leaderboard-container');
            if (questionContainer) questionContainer.style.display = 'none';
            if (leaderboardContainer) leaderboardContainer.style.display = 'none';
            if (finalLeaderboardContainer) finalLeaderboardContainer.style.display = 'none';
            
            // Reset student score for new session
            currentTotalScore = 0;
            previousScore = 0;
        });
    }
    
    // Save session start data to database
    async function saveSessionStartData(sessionStartData) {
        try {
        const formData = new FormData();
        formData.append('quizid', config.quizId);
        formData.append('sessionid', sessionStartData.sessionId);
            formData.append('questionsdata', sessionStartData.questionsData);
            formData.append('totalquestions', sessionStartData.totalQuestions);
            formData.append('startedat', sessionStartData.startedAt);
            
            const response = await fetch('ajax/save_session.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            if (result.success) {
                console.log('Session start data saved successfully');
            } else {
                console.error('Failed to save session start data:', result.error);
            }
        } catch (error) {
            console.error('Error saving session start data:', error);
        }
    }

    // Save session results to database
    async function saveSessionResults(sessionData, leaderboard) {
        try {
            const questionsData = JSON.stringify(currentQuestions || []);
            const sessionResults = JSON.stringify(leaderboard || []);
            
            const formData = new FormData();
            formData.append('quizid', config.quizId);
            formData.append('sessionid', sessionData.instanceId || sessionData.sessionId);
            formData.append('sessionname', `Session ${new Date().toLocaleString()}`);
            formData.append('questionsdata', questionsData);
            formData.append('participantscount', sessionData.participantsCount);
            formData.append('totalquestions', currentQuestions ? currentQuestions.length : 0);
            formData.append('sessionresults', sessionResults);
            formData.append('startedat', sessionData.startedAt || Math.floor(Date.now() / 1000));
            formData.append('endedat', sessionData.endedAt);
            
            const response = await fetch('ajax/save_session.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            if (result.success) {
                console.log('Session results saved successfully');
            } else {
                console.error('Failed to save session results:', result.error);
            }
        } catch (error) {
            console.error('Error saving session results:', error);
        }
    }

    // Show sessions dialog
    async function showSessionsDialog() {
        try {
            const response = await fetch(`ajax/get_sessions.php?quizid=${config.quizId}`);
            const result = await response.json();
            
            if (result.success) {
                displaySessionsDialog(result.sessions);
            } else {
                console.error('Failed to load sessions:', result.error);
                alert('Failed to load session history');
            }
        } catch (error) {
            console.error('Error loading sessions:', error);
            alert('Error loading session history');
        }
    }

    // Display sessions dialog
    function displaySessionsDialog(sessions) {
        // Remove existing dialog if any
        const existingDialog = document.getElementById('sessions-dialog');
        if (existingDialog) {
            existingDialog.remove();
        }
        
        // Create dialog
        const dialog = document.createElement('div');
        dialog.id = 'sessions-dialog';
        dialog.className = 'question-editor-modal';
        dialog.style.display = 'block';
        
        let sessionsHtml = `
            <div class="question-editor-content" style="max-width: 900px; max-height: 80vh; overflow-y: auto;">
                <span class="sessions-close" style="float: right; font-size: 28px; font-weight: bold; cursor: pointer; color: #aaa;">&times;</span>
                <h2>Past Quiz Sessions</h2>
                <div class="sessions-list">
        `;
        
        if (sessions.length === 0) {
            sessionsHtml += '<p>No past sessions found.</p>';
        } else {
            sessionsHtml += `
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #f5f5f5;">
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Session Name</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Teacher</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Participants</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Questions</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Started</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Ended</th>
                            <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            sessions.forEach(session => {
                const statusBadge = session.started ? 
                    (session.timeended ? '<span style="background: #28a745; color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px;">Completed</span>' : 
                     '<span style="background: #ffc107; color: black; padding: 2px 6px; border-radius: 3px; font-size: 12px;">In Progress</span>') :
                    '<span style="background: #6c757d; color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px;">Not Started</span>';
                
                sessionsHtml += `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">
                            ${session.session_name}
                            <br><small style="color: #666;">${statusBadge}</small>
                        </td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${session.teacher_name}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${session.participants_count}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${session.total_questions}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${session.created_formatted}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${session.ended_formatted || '-'}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                            ${session.timeended ? 
                              (session.session_results && Array.isArray(session.session_results) && session.session_results.length > 0 ? 
                                `<button class="btn btn-sm btn-primary gq-btn gq-btn-sm gq-btn-primary" onclick="showSessionResults('${session.session_id || session.id}', ${JSON.stringify(session.session_results).replace(/"/g, '&quot;').replace(/'/g, '&#39;')})">View Leaderboard</button>` : 
                                `<button class="btn btn-sm btn-info gq-btn gq-btn-sm gq-btn-info" onclick="loadAndShowSessionLeaderboard('${session.session_id || session.id}')">View Leaderboard</button>`) :
                              '<span style="color: #999;">Session Active</span>'}
                        </td>
                    </tr>
                `;
            });
            
            sessionsHtml += '</tbody></table>';
        }
        
        sessionsHtml += `
                </div>
            </div>
        `;
        
        dialog.innerHTML = sessionsHtml;
        document.body.appendChild(dialog);
        
        // Add close event listener
        const closeBtn = dialog.querySelector('.sessions-close');
        closeBtn.addEventListener('click', () => {
            dialog.remove();
        });
        
        // Close on outside click
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    // Load and show session leaderboard from database
    window.loadAndShowSessionLeaderboard = async function(sessionId) {
        try {
            const response = await fetch(`ajax/get_session_scores.php?sessionid=${encodeURIComponent(sessionId)}&quizid=${window.GAMIFIED_QUIZ_CONFIG?.quizId || ''}`);
            const result = await response.json();
            
            if (result.success && result.leaderboard && result.leaderboard.length > 0) {
                window.showSessionResults(sessionId, result.leaderboard);
            } else {
                alert('No leaderboard data found for this session.');
            }
        } catch (error) {
            console.error('Error loading session leaderboard:', error);
            alert('Error loading leaderboard: ' + error.message);
        }
    };
    
    // Show session results - make it global so it can be called from onclick
    window.showSessionResults = async function(sessionId, results) {
        // Remove existing results dialog if any
        const existingDialog = document.getElementById('session-results-dialog');
        if (existingDialog) {
            existingDialog.remove();
        }
        
        // Create results dialog
        const dialog = document.createElement('div');
        dialog.id = 'session-results-dialog';
        dialog.className = 'question-editor-modal';
        dialog.style.display = 'block';
        
        // Show loading state first
        let resultsHtml = `
            <div class="question-editor-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                <span class="results-close" style="float: right; font-size: 28px; font-weight: bold; cursor: pointer; color: #aaa;">&times;</span>
                <h2>Session Leaderboard</h2>
                <div class="results-content">
                    <p>Loading leaderboard...</p>
                </div>
            </div>
        `;
        
        dialog.innerHTML = resultsHtml;
        document.body.appendChild(dialog);
        
        // Add close event listener
        const closeBtn = dialog.querySelector('.results-close');
        closeBtn.addEventListener('click', () => {
            dialog.remove();
        });
        
        // Close on outside click
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
        
        if (!results || results.length === 0) {
            const contentDiv = dialog.querySelector('.results-content');
            contentDiv.innerHTML = '<p>No results available for this session.</p>';
            return;
        }
        
        // Sort results by score (descending)
        const sortedResults = [...results].sort((a, b) => (b.score || 0) - (a.score || 0));
        
        // Extract user IDs to fetch full names
        const userIds = sortedResults.map(participant => {
            const id = participant.userId || participant.user_id || participant.userid || participant.id;
            return id ? parseInt(id) : null;
        }).filter(id => id && !isNaN(id) && id > 0);
        
        // Fetch user details if available
        let userDetailsMap = {};
        if (userIds.length > 0 && window.gamifiedQuizFetchUserDetails) {
            await window.gamifiedQuizFetchUserDetails(userIds);
            const cache = window.gamifiedQuizUserDetailsCache || {};
            
            // Build map for quick lookup from cache
            userIds.forEach(id => {
                if (cache[id]) {
                    const user = cache[id];
                    userDetailsMap[id] = user.fullname || (user.firstname + ' ' + user.lastname) || user.username;
                } else if (cache[String(id)]) {
                    const user = cache[String(id)];
                    userDetailsMap[id] = user.fullname || (user.firstname + ' ' + user.lastname) || user.username;
                }
            });
        }
        
        // Helper to get display name
        function getParticipantName(participant) {
            const userId = participant.userId || participant.user_id || participant.userid || participant.id;
            if (userId && userDetailsMap[userId]) {
                return userDetailsMap[userId];
            }
            // Fallback to username or fullname from participant data
            if (participant.fullname && !participant.fullname.match(/^User \d+$/)) {
                return participant.fullname;
            }
            if (participant.username && !participant.username.match(/^User \d+$/)) {
                return participant.username;
            }
            return `User ${userId || '?'}`;
        }
        
        // Build leaderboard HTML
        resultsHtml = `
            <div class="leaderboard-display" style="margin-top: 20px;">
                <h3 style="text-align: center; margin-bottom: 20px; font-size: 24px;">🏆 Final Leaderboard 🏆</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                            <th style="padding: 12px; text-align: center; width: 80px; border: 1px solid rgba(255,255,255,0.3);">Rank</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.3);">Student Name</th>
                            <th style="padding: 12px; text-align: right; border: 1px solid rgba(255,255,255,0.3);">Score</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        sortedResults.forEach((participant, index) => {
            const rank = index + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
            const displayName = getParticipantName(participant);
            const score = participant.score || 0;
            const isTopThree = rank <= 3;
            
            resultsHtml += `
                <tr style="border-bottom: 1px solid #dee2e6; ${isTopThree ? 'background: #fff3cd; font-weight: bold;' : ''}">
                    <td style="padding: 12px; text-align: center; border: 1px solid #dee2e6;">
                        <span style="font-size: 1.2em;">${medal || rank}</span>
                    </td>
                    <td style="padding: 12px; border: 1px solid #dee2e6;">
                        <span style="font-size: 16px;">${displayName}</span>
                    </td>
                    <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">
                        <span style="font-size: 18px; color: #007bff; font-weight: bold;">${score} pts</span>
                    </td>
                </tr>
            `;
        });
        
        resultsHtml += `
                    </tbody>
                </table>
                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                        <strong>Total Participants:</strong> ${sortedResults.length}
                    </p>
                </div>
            </div>
        `;
        
        const contentDiv = dialog.querySelector('.results-content');
        contentDiv.innerHTML = resultsHtml;
    };

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();

