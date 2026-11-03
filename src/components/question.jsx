import { useContext } from "react";
import { QuizContext } from "../context/quiz-context";

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const Question = () => {
  const {
    quizData,
    currentQuestion,
    setCurrentQuestion,
    userAnswers,
    setAnswerForQuestion,
    timerSeconds,
  } = useContext(QuizContext);

  const questionObj = quizData[currentQuestion];
  if (!questionObj) return null;

  const selectedAnswer = userAnswers[currentQuestion];
  const progressPercent = Math.round(((currentQuestion + 1) / quizData.length) * 100);

  const handleOptionClick = (option) => {
    setAnswerForQuestion(currentQuestion, option);
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="category-pill">{questionObj.category || "General"}</div>
        <div className="timer-badge">
          <span className="timer-icon">⏱️</span>
          <span>{formatTime(timerSeconds)}</span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-info">
          <span>Question {currentQuestion + 1} of {quizData.length}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <h2 className="question-title">{questionObj.question}</h2>

      <div className="options-list">
        {questionObj.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const label = OPTION_LABELS[index] || index + 1;
          return (
            <button
              key={index}
              type="button"
              className={`option-btn ${isSelected ? "selected" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              <span className="option-label">{label}</span>
              <span className="option-text">{option}</span>
            </button>
          );
        })}
      </div>

      <div className="question-pagination">
        {quizData.map((_, idx) => {
          const isAnswered = userAnswers[idx] !== null;
          const isCurrent = currentQuestion === idx;
          return (
            <button
              key={idx}
              type="button"
              className={`page-dot ${isCurrent ? "active" : ""} ${isAnswered ? "answered" : ""}`}
              onClick={() => setCurrentQuestion(idx)}
              aria-label={`Jump to question ${idx + 1}`}
              title={`Question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="nav-buttons">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={goToPrevious}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={goToNext}
          disabled={!selectedAnswer}
        >
          {currentQuestion === quizData.length - 1 ? "Finish Quiz ✓" : "Next Question →"}
        </button>
      </div>
    </div>
  );
};

export default Question;
