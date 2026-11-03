import { useState, useEffect } from "react";
import { QuizContext } from "./QuizContext";
import { quizData } from "../data/quiz-data";

export { QuizContext };

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(() => quizData.map(() => null));
  const [timerSeconds, setTimerSeconds] = useState(0);

  const isCompleted = currentQuestion >= quizData.length;

  // Track elapsed time while quiz is in progress
  useEffect(() => {
    if (isCompleted) return;

    const intervalId = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCompleted]);

  // Update answer for a specific question
  const setAnswerForQuestion = (index, answer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  // Reset quiz state
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(quizData.map(() => null));
    setTimerSeconds(0);
  };

  const score = quizData.reduce((acc, q, index) => {
    return userAnswers[index] === q.answer ? acc + 1 : acc;
  }, 0);

  const answeredCount = userAnswers.filter((ans) => ans !== null).length;

  return (
    <QuizContext.Provider
      value={{
        quizData,
        currentQuestion,
        setCurrentQuestion,
        userAnswers,
        setAnswerForQuestion,
        resetQuiz,
        score,
        answeredCount,
        timerSeconds,
        isCompleted,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
