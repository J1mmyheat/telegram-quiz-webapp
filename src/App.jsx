import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get("quiz_id") || "general";
    fetch(`/quizzes/${quizId}.json`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch((err) => console.error("Ошибка загрузки квиза:", err));
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) setCurrent(next);
    else setFinished(true);
  };

  if (questions.length === 0) return <div className="App">Загрузка...</div>;

  return (
    <div className="App">
      {!finished ? (
        <div>
          <h2>{questions[current].question}</h2>
          {questions[current].options.map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(opt.correct)}>
              {opt.text}
            </button>
          ))}
        </div>
      ) : (
        <h2>Вы набрали {score} из {questions.length}</h2>
      )}
    </div>
  );
}

export default App;