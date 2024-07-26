import React from "react";

export default function Options({ option, dispatch, index, answer, question }) {
  return (
    <button
      className={`btn btn-option ${index === answer ? "answer" : ""} ${
        answer !== null &&
        (index === question.correctOption ? "correct" : "wrong")
      }`}
      onClick={() => {
        const onAnswer = () => {
          dispatch({ type: "answer", payload: index });
          index === question.correctOption && dispatch({ type: "answeredCorrectly", payload: question.points });
        };

        answer === null && onAnswer();
      }}
    >
      {option}
    </button>
  );
}
