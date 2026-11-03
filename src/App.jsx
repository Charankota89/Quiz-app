import React from "react";
import { QuizProvider } from "./context/quiz-context";
import Quiz from "./components/quiz";

function App() {
  return (
    <QuizProvider>
      <div className="app-container">
        <h1>Quiz App</h1>
        <Quiz />
      </div>
    </QuizProvider>
  );
}

export default App;
