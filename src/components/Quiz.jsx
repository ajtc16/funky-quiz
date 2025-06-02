import React, { useState } from "react";
import { questions } from "../data/questions";

export default function Quiz({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  function handleSelect(optionIdx) {
    setAnswers([...answers, optionIdx]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onFinish(answers.concat(optionIdx));
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white/70 rounded-2xl shadow-xl p-6 mt-8 mb-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">Pregunta {current + 1}/10</h2>
      <p className="mb-6 text-lg text-center">{questions[current].question}</p>
      <div className="grid gap-4">
        {questions[current].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className="bg-pink-100 border border-pink-300 hover:bg-pink-200 font-semibold py-3 px-4 rounded-xl transition"
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="text-center mt-6 text-pink-400">
        <span className="text-sm">Responde con sinceridad para conocer tu estilo ✨</span>
      </div>
    </div>
  );
}
