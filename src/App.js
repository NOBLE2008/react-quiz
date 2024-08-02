import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import { act, useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Loader from "./Loader";
import Main from "./Main";
import Question from "./Question";
import NextButton from "./NextButton";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";
import Progress from "./Progress";
import { useQuiz } from "../context/QuizContext";

function App() {
  //Timer Use Effect

  // Fetch questions from API
  const { state, maxPoints } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "ready" && <StartScreen />}
        {state.status === "error" && <Error />}
        {state.status === "loading" && <Loader />}
        {state.status === "active" && (
          <>
            <Progress />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <Footer>
              <Timer
                secondsRemaining={state.secondsRemaining}
                dispatch={dispatch}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                questions={state.questions}
                index={state.index}
              />
            </Footer>
          </>
        )}
        {state.status === "finished" && (
          <Finish
            points={state.points}
            dispatch={dispatch}
            highScore={state.highScore}
            maxPoints={maxPoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
