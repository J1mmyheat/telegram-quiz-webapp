
import React, { useState } from "react";

const questions = [
  {
    question: "Столица Франции?",
    options: ["Париж", "Рим", "Берлин", "Мадрид"],
    correct: 0,
  },
  {
    question: "Самый популярный язык программирования?",
    options: ["Python", "Java", "C++", "Ruby"],
    correct: 0,
  },
  {
    question: "Год запуска первого спутника?",
    options: ["1957", "1969", "1945", "1980"],
    correct: 0,
  },
  {
    question: "Символ кислорода в химии?",
    options: ["O", "K", "C", "H"],
    correct: 0,
  },
  {
    question: "Сколько будет 3 x 4?",
    options: ["7", "12", "9", "14"],
    correct: 1,
  },
];

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user_id");

  const handleAnswer = (index) => {
    if (index === questions[step].correct) {
      setScore(score + 1);
    }
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
      sendResult(score + (index === questions[step].correct ? 1 : 0));
    }
  };

  const sendResult = async (finalScore) => {
    await fetch("http://localhost:8080/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, score: finalScore }),
    });
  };

  if (finished) {
    return (
      <div className="quiz">
        <h2>Квиз завершён!</h2>
        <p>Вы набрали {score} из {questions.length}.</p>
        <p>Результат будет отправлен боту.</p>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h2>{questions[step].question}</h2>
      {questions[step].options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
