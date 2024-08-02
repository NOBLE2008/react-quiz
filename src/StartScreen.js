import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  const { state, dispatch } = useQuiz();

  const { questions } = state;
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{questions.length} questions to test your React Mastery</h3>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let's Start
      </button>
    </div>
  );
}
