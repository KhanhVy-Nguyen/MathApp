import React, { useState, useEffect } from 'react';
import './MathDashboard.css';

const operators = ['+', '-', '*', '/'];

const generateQuestion = () => {
  const op = operators[Math.floor(Math.random() * operators.length)];
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  
  if (op === '/') {
    num1 = num1 * num2;
  }
  
  let answer;
  switch (op) {
    case '+': answer = num1 + num2; break;
    case '-': answer = num1 - num2; break;
    case '*': answer = num1 * num2; break;
    case '/': answer = num1 / num2; break;
    default: answer = 0;
  }
  
  return { num1, num2, op, answer };
};

const MathDashboard = ({ userName }) => {
  const [isTimedMode, setIsTimedMode] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLimit, setTimeLimit] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);

  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | 'timeout' | null
  const [score, setScore] = useState(0);

  // Timer logic
  useEffect(() => {
    // If not in timed mode, paused, or showing feedback, pause the timer
    if (!isTimedMode || isPaused || feedback !== null) return;
    
    // Stop at 0 and trigger timeout
    if (timeLeft <= 0) {
      setFeedback('timeout');
      setTimeout(() => {
        setQuestion(generateQuestion());
        setUserAnswer('');
        setFeedback(null);
        setTimeLeft(timeLimit);
      }, 1500);
      return;
    }
    
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft, feedback, timeLimit, isTimedMode, isPaused]);

  const handleTimeLimitChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setTimeLimit(isNaN(val) ? '' : val);
  };

  const handleTimeLimitBlur = () => {
    let val = parseInt(timeLimit, 10);
    if (isNaN(val) || val <= 0) val = 10;
    
    setTimeLimit(val);
    setTimeLeft(val);
    setIsPaused(false);
    setQuestion(generateQuestion());
    setUserAnswer('');
    setFeedback(null);
  };

  const toggleMode = () => {
    setIsTimedMode(prev => !prev);
    setIsPaused(false);
    // Reset question when switching modes to keep it fair
    setQuestion(generateQuestion());
    setUserAnswer('');
    setFeedback(null);
    setTimeLeft(timeLimit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback !== null || isPaused) return;
    
    if (parseFloat(userAnswer) === question.answer) {
      setFeedback('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        setQuestion(generateQuestion());
        setUserAnswer('');
        setFeedback(null);
        setTimeLeft(timeLimit);
      }, 1000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
        setUserAnswer('');
      }, 1000);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {userName.charAt(0).toUpperCase() + userName.slice(1)}!</h1>
        <div className="header-stats">
          <p>Score: {score}</p>
          
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${isTimedMode ? 'active' : ''}`}
              onClick={() => { if(!isTimedMode) toggleMode(); }}
            >
              Timed
            </button>
            <button 
              className={`mode-btn ${!isTimedMode ? 'active' : ''}`}
              onClick={() => { if(isTimedMode) toggleMode(); }}
            >
              Untimed
            </button>
          </div>

          {isTimedMode && (
            <div className="settings">
              <label htmlFor="timeLimit">Timer limit (sec): </label>
              <input 
                id="timeLimit"
                type="number" 
                value={timeLimit} 
                onChange={handleTimeLimitChange}
                onBlur={handleTimeLimitBlur}
                min="1"
              />
            </div>
          )}
        </div>
      </header>
      
      <div className="math-card">
        {isTimedMode && (
          <div className="timer-section">
            <div className={`timer-display ${timeLeft <= 3 ? 'danger' : ''}`}>
              {timeLeft}s
            </div>
            <button 
              className="pause-btn" 
              onClick={() => setIsPaused(!isPaused)}
              disabled={feedback !== null}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        )}
        
        <h2>Solve this!</h2>
        <div className="question">
          {question.num1} {question.op === '*' ? 'x' : question.op === '/' ? ':' : question.op} {question.num2} = ?
        </div>
        
        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={isPaused ? "Paused..." : "Your answer"}
            required
            autoFocus
            disabled={feedback !== null || isPaused}
          />
          <button type="submit" disabled={feedback !== null || isPaused}>Submit</button>
        </form>
        
        {feedback === 'correct' && <div className="feedback correct">Correct! Awesome job. 🎉</div>}
        {feedback === 'incorrect' && <div className="feedback incorrect">Oops! Try again. 🤔</div>}
        {feedback === 'timeout' && <div className="feedback incorrect">Time's up! Moving on... ⏰</div>}
      </div>
    </div>
  );
};

export default MathDashboard;
