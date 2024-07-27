import React from "react";

export default function NextButton({ dispatch, answer, questions, index }) {
  if (answer === null) return null;

  if (index+1 < questions.length) {
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn btn-ui"
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        onClick={() => dispatch({ type: "finish"  })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
  }
}
