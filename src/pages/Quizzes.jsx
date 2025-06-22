import React, { useState, useEffect } from 'react';

const Quizzes = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        fetch('/data/quiz-questions.json')
            .then(res => res.json())
            .then(data => setQuestions(data.questions))
            .catch(err => console.error("Failed to load quiz questions:", err));
    }, []);

    const handleAnswerSelect = (index) => {
        if (showFeedback) return;
        const isCorrect = index === questions[currentQuestionIndex].correct;
        setSelectedAnswer(index);
        setShowFeedback(true);
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        } else {
            setIncorrectAnswers(prev => [...prev, {
                question: questions[currentQuestionIndex].question,
                yourAnswer: questions[currentQuestionIndex].options[index],
                correctAnswer: questions[currentQuestionIndex].options[questions[currentQuestionIndex].correct]
            }]);
        }
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setIsFinished(true);
        }
    };
    
    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsFinished(false);
        setIncorrectAnswers([]);
        setQuizStarted(false);
    };

    if (questions.length === 0) {
        return <div className="container">Loading quiz...</div>;
    }
    
    if (!quizStarted) {
        return (
            <div className="quiz-container quiz-intro">
                <h2>Ready to Test Your Knowledge?</h2>
                <p>This quiz will challenge you on the fundamental rights of children. See how well you know them!</p>
                <button onClick={() => setQuizStarted(true)} className="button button-primary">Start Quiz</button>
            </div>
        )
    }

    if (isFinished) {
        return (
            <div className="quiz-container">
                <div className="quiz-results">
                    <h2>Quiz Complete!</h2>
                    <p>You scored {score} out of {questions.length}</p>
                    {incorrectAnswers.length > 0 && (
                        <div className="incorrect-answers-summary">
                            <h3>Let's Review:</h3>
                            <ul>
                                {incorrectAnswers.map((item, index) => (
                                    <li key={index}>
                                        <p><strong>Question:</strong> {item.question}</p>
                                        <p><strong>Your Answer:</strong> {item.yourAnswer}</p>
                                        <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button onClick={handleRestartQuiz} className="button button-primary">Play Again</button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Rights Quiz Challenge</h2>
                <div className="quiz-progress">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span className="quiz-score">Score: {score}</span>
                </div>
            </div>
            <div className="quiz-content">
                <h3>{currentQuestion.question}</h3>
                <div className="options-container">
                    {currentQuestion.options.map((option, index) => {
                        let buttonClass = 'option';
                        if (showFeedback) {
                            if (index === currentQuestion.correct) {
                                buttonClass += ' correct';
                            } else if (index === selectedAnswer) {
                                buttonClass += ' incorrect';
                            }
                        }
                        return (
                            <button
                                key={index}
                                className={buttonClass}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showFeedback}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {showFeedback && (
                    <div className={`feedback-container ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <h4 className="feedback-heading">{isCorrect ? 'Correct!' : 'Not quite right...'}</h4>
                        <p className="feedback-text">{currentQuestion.explanation}</p>
                        <button onClick={handleNextQuestion} className="button button-primary">
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quizzes;
