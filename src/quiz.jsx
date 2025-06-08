import { useState } from "react";

const questions = [
  {
    q: "Столица Франции?",
    options: ["Париж", "Рим", "Берлин", "Мадрид"],
    answer: 0,
  },
  {
    q: "Самый популярный язык программирования?",
    options: ["Python", "Java", "C++", "Ruby"],
    answer: 0,
  },
  {
    q: "Год запуска первого спутника?",
    options: ["1957", "1969", "1945", "1980"],
    answer: 0,
  },
];

export default function QuizApp() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index) => {
    if (index === questions[step].answer) setScore(score + 1);
    if (step + 1 < questions.length) setStep(step + 1);
    else setFinished(true);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      {!finished ? (
        <>
          <h2>Вопрос {step + 1} из {questions.length}</h2>
          <p>{questions[step].q}</p>
          {questions[step].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                display: "block",
                margin: "10px 0",
                padding: "10px 15px",
                fontSize: "16px",
              }}
            >
              {opt}
            </button>
          ))}
          <p>Текущий счёт: {score}</p>
        </>
      ) : (
        <>
          <h2>✅ Квиз завершён!</h2>
          <p>Ты набрал {score} из {questions.length}</p>
          <h3>🏆 Топ игроков:</h3>
          <ul>
            <li>@sasha — 5 баллов</li>
            <li>@lena — 4 балла</li>
            <li>@mike — 3 балла</li>
          </ul>
          <button onClick={() => { setStep(0); setScore(0); setFinished(false); }}>
            Пройти ещё раз
          </button>
        </>
      )}
    </div>
  );
}