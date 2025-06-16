import React, { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get("quiz_id") || "general_knowledge";

    fetch(`/quizzes/${quizId}.json`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch((err) => {
        console.error("Ошибка загрузки квиза:", err);
        setQuestions([]); // безопасная заглушка
      });
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  if (!questions.length) return <div>Загрузка...</div>;

  if (finished) {
    return (
      <div className="results">
        <h2>Квиз завершён</h2>
        <p>Вы набрали {score} из {questions.length} баллов!</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz">
      <h2>{q.q}</h2>
      {q.options.map((option, idx) => (
        <button key={idx} onClick={() => handleAnswer(option.correct)}>
          {option.text}
        </button>
      ))}
    </div>
  );
}

export default App;
