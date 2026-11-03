import { useState, useContext } from "react";
import { QuizContext } from "../context/quiz-context";

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const getFeedback = (percentage) => {
  if (percentage === 100) {
    return {
      title: "Mastery! Perfect Score ",
      description: "Incredible! You answered every question correctly.",
      badgeClass: "badge-perfect",
    };
  }
  if (percentage >= 80) {
    return {
      title: "Great Job! Outstanding Performance ",
      description: "You have strong command of these concepts. Keep it up!",
      badgeClass: "badge-great",
    };
  }
  if (percentage >= 50) {
    return {
      title: "Good Effort! Solid Knowledge ",
      description: "You passed! Review the questions below to master every topic.",
      badgeClass: "badge-good",
    };
  }
  return {
    title: "Keep Practicing! Never Stop Learning ",
    description: "Review your answers below and try again to improve your score.",
    badgeClass: "badge-retry",
  };
};

const Result = () => {
  const { quizData, userAnswers, resetQuiz, score, timerSeconds } = useContext(QuizContext);
  const [showReview, setShowReview] = useState(true);

  const totalQuestions = quizData.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const feedback = getFeedback(percentage);
  const incorrectCount = totalQuestions - score;

  return (
    <div className="result-card">
      <div className={`result-header-badge ${feedback.badgeClass}`}>
        <h2>{feedback.title}</h2>
        <p>{feedback.description}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{score} / {totalQuestions}</div>
          <div className="stat-label">Final Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{percentage}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatTime(timerSeconds)}</div>
          <div className="stat-label">Time Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value stat-breakdown">
            <span className="text-correct">✓ {score}</span>
            <span className="text-separator">|</span>
            <span className="text-wrong">✗ {incorrectCount}</span>
          </div>
          <div className="stat-label">Correct / Wrong</div>
        </div>
      </div>

      <div className="result-actions">
        <button type="button" className="btn btn-primary" onClick={resetQuiz}>
          Retake Quiz
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowReview((prev) => !prev)}
        >
          {showReview ? "Hide Answer Review ▲" : "Review All Answers ▼"}
        </button>
      </div>

      {showReview && (
        <div className="review-section">
          <h3 className="review-title">Detailed Answer Review</h3>
          <div className="review-list">
            {quizData.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.answer;

              return (
                <div
                  key={q.id || index}
                  className={`review-item ${isCorrect ? "review-correct" : "review-wrong"}`}
                >
                  <div className="review-item-header">
                    <span className="review-question-num">Question {index + 1}</span>
                    <span className="review-category">{q.category}</span>
                    <span className={`review-status-tag ${isCorrect ? "tag-correct" : "tag-wrong"}`}>
                      {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  </div>

                  <p className="review-question-text">{q.question}</p>

                  <div className="review-answers-box">
                    <div className="answer-row">
                      <span className="answer-key">Your Answer:</span>
                      <span className={`answer-val ${isCorrect ? "text-correct" : "text-wrong"}`}>
                        {userAnswer || "Not answered"}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="answer-row">
                        <span className="answer-key">Correct Answer:</span>
                        <span className="answer-val text-correct">{q.answer}</span>
                      </div>
                    )}

                    {q.explanation && (
                      <div className="review-explanation">
                        <strong>Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
