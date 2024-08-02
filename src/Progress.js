import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { maxPoints, state } = useQuiz();
  const { answer, points, index, questions } = state;

  const maxQuestions = questions.length;
  let inc = 0;
  if (answer !== null) inc = 1;

  return (
    <header className="progress">
      <progress max={maxQuestions} value={index + inc} />
      <p>
        Question <strong>{index + 1}</strong>/{maxQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}
