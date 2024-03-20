import React, { useState, useEffect } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  // Initialize QuizCore instance
  const [quizCore] = useState(new QuizCore());

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [update, setUpdate] = useState(0); // Used to force re-render

  useEffect(() => {
    setSelectedAnswer(null);
  }, [update]);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
    quizCore.answerQuestion(option);
  };

  const handleButtonClick = (): void => {
    quizCore.nextQuestion();
    setUpdate(update + 1);
  };

  const currentQuestion = quizCore.getCurrentQuestion();


  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;