import React, { useEffect, useState } from "react";

function App() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get("quiz_id") || "general_knowledge";

    fetch(`/quizzes/${quizId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Квиз не найден");
        return res.json();
      })
      .then((data) => setQuiz(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (!quiz) return <p>Квиз не найден.</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <ul>
            {q.answers.map((answer, i) => (
              <li key={i}>{answer}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
