import React, { useState } from "react";
import { QUESTIONS } from "./questions";

function App() {
  const [step, setStep] = useState(-1);
  const [score, setScore] = useState(0);

  const handleStart = () => setStep(0);

  const handleAnswer = (index) => {
    if (index === QUESTIONS[step].answer) setScore(score + 1);
    setStep(step + 1);
  };

  if (step === -1) {
    return <div className="quiz-box"><button onClick={handleStart}>Начать квиз</button></div>;
  }

  if (step >= QUESTIONS.length) {
    return (
      <div className="quiz-box">
        <h2>✅ Квиз завершён!</h2>
        <p>Ты набрал {score} из {QUESTIONS.length}.</p>
        <h3>🏆 Топ игроков (заглушка)</h3>
        <ul>
          <li>1. Alex — 5 очков</li>
          <li>2. Maria — 4 очка</li>
          <li>3. You — {score} очков</li>
        </ul>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="quiz-box">
      <h2>{q.q}</h2>
      <div className="options">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

export default App;