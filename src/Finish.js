import React from "react";

export default function Finish({ points, maxPoints, highScore, dispatch }) {
  const X = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored {points} out of {maxPoints}. ({X} percentage)
      </p>
      <p className="highscore">Highscore: {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >Restart</button>
    </>
  );
}
