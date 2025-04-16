document.addEventListener('DOMContentLoaded', function() {
    // Quiz elements
    const quizContent = document.querySelector('.quiz-content');
    const questionContainer = document.querySelector('.question-container');
    const optionsContainer = document.querySelector('.options-container');
    const feedbackContainer = document.querySelector('.feedback-container');
    const nextButton = document.querySelector('.next-question');
    const scoreValue = document.querySelector('.score-value');
    
    // Quiz state
    let currentQuestion = 0;
    let score = 0;
    let questions = [];
    
    // Fetch questions from a local JSON file
    async function fetchQuestions() {
        try {
            const response = await fetch('../js/data/quiz-questions.json');
            questions = await response.json();
            loadQuestion();
        } catch (error) {
            console.error('Failed to load questions:', error);
            // Fallback to hardcoded questions
            questions = [
                {
                    question: "What right ensures that children can go to school?",
                    options: [
                        { text: "Right to Education", correct: true },
                        { text: "Right to Play", correct: false },
                        { text: "Right to Privacy", correct: false },
                        { text: "Right to Food", correct: false }
                    ],
                    feedback: "The Right to Education means that all children have the right to go to school and learn."
                },
                {
                    question: "Which right protects children from harmful work?",
                    options: [
                        { text: "Right to Play", correct: false },
                        { text: "Right to Protection from Exploitation", correct: true },
                        { text: "Right to Freedom of Speech", correct: false },
                        { text: "Right to Healthcare", correct: false }
                    ],
                    feedback: "The Right to Protection from Exploitation ensures children are protected from work that is dangerous or might harm their health or education."
                },
                {
                    question: "What right ensures children can express their opinions?",
                    options: [
                        { text: "Right to Education", correct: false },
                        { text: "Right to Freedom of Expression", correct: true },
                        { text: "Right to Privacy", correct: false },
                        { text: "Right to Play", correct: false }
                    ],
                    feedback: "The Right to Freedom of Expression means children can share their thoughts and opinions freely."
                }
            ];
            loadQuestion();
        }
    }
    
    // Load a question into the UI
    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            showFinalResults();
            return;
        }
        
        const question = questions[currentQuestion];
        
        // Update question text
        questionContainer.querySelector('.question-text').textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option.text;
            button.dataset.correct = option.correct;
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
        });
        
        // Hide feedback container
        feedbackContainer.classList.add('hidden');
        
        // Announce new question to screen reader
        announceToScreenReader(`Question ${currentQuestion + 1}: ${question.question}`);
    }
    
    // Handle option selection
    function selectOption() {
        const selectedOption = this;
        const isCorrect = selectedOption.dataset.correct === 'true';
        
        // Disable all options
        const allOptions = optionsContainer.querySelectorAll('.option');
        allOptions.forEach(option => {
            option.disabled = true;
            
            // Highlight correct/incorrect answers
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            } else if (option === selectedOption && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score if correct
        if (isCorrect) {
            score++;
            scoreValue.textContent = score;
        }
        
        // Show feedback
        const feedbackHeading = feedbackContainer.querySelector('.feedback-heading');
        const feedbackText = feedbackContainer.querySelector('.feedback-text');
        
        feedbackHeading.textContent = isCorrect ? 'Correct!' : 'Not quite right';
        feedbackHeading.className = 'feedback-heading ' + (isCorrect ? 'correct' : 'incorrect');
        feedbackText.textContent = questions[currentQuestion].feedback;
        
        feedbackContainer.classList.remove('hidden');
        
        // Play sound effect
        playSound(isCorrect ? 'correct' : 'incorrect');
        
        // Announce result to screen reader
        announceToScreenReader(`${isCorrect ? 'Correct' : 'Incorrect'}. ${questions[currentQuestion].feedback}`);
    }
    
    // Move to next question
    nextButton.addEventListener('click', function() {
        currentQuestion++;
        loadQuestion();
    });
    
    // Show final results when quiz is complete
    function showFinalResults() {
        const percentage = (score / questions.length) * 100;
        const resultsMessage = getResultsMessage(score, questions.length);
        
        quizContent.innerHTML = `
            <div class="quiz-results">
                <h3>Quiz Complete!</h3>
                <p>You scored ${score} out of ${questions.length}</p>
                <div class="results-message">
                    ${resultsMessage}
                </div>
                <button class="restart-quiz">Try Again</button>
            </div>
        `;
        
        // Add event listener to restart button
        document.querySelector('.restart-quiz').addEventListener('click', function() {
            currentQuestion = 0;
            score = 0;
            scoreValue.textContent = score;
            loadQuestion();
            announceToScreenReader('Quiz restarted');
        });
        
        // Announce final results to screen reader
        announceToScreenReader(`Quiz complete. You scored ${score} out of ${questions.length}. ${resultsMessage}`);
    }
    
    // Get appropriate message based on score
    function getResultsMessage(score, total) {
        const percentage = (score / total) * 100;
        
        if (percentage >= 90) {
            return "Amazing! You're a Rights Champion!";
        } else if (percentage >= 70) {
            return "Great job! You know your rights well!";
        } else if (percentage >= 50) {
            return "Good effort! You're learning about your rights!";
        } else {
            return "Keep learning about your rights! Try again!";
        }
    }
    
    // Play sound effects
    function playSound(type) {
        const sound = new Audio(`../assets/audio/${type}.mp3`);
        sound.play();
    }
    
    // Handle keyboard navigation for options
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const options = optionsContainer.querySelectorAll('.option');
            const currentIndex = Array.from(options).indexOf(document.activeElement);
            
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                options[currentIndex - 1].focus();
            } else if (e.key === 'ArrowDown' && currentIndex < options.length - 1) {
                options[currentIndex + 1].focus();
            }
        }
    });
    
    // Initialize quiz
    fetchQuestions();
}); 