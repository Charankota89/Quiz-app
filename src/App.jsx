import { QuizProvider } from "./context/quiz-context";
import Quiz from "./components/quiz";

function App() {
  return (
    <QuizProvider>
      <div className="app-wrapper">
        <header className="app-header">
          <div className="logo-badge">QuizApp</div>
          <h1>Interactive Quiz App</h1>
          <p className="app-subtitle">Test your skills and challenge your knowledge</p>
        </header>
        <main className="app-container">
          <Quiz />
        </main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Quiz App • Built with React & Vite</p>
        </footer>
      </div>
    </QuizProvider>
  );
}

export default App;
