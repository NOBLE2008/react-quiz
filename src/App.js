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

function App() {
  const initialState = {
    questions: [],
    index: 0,
    status: "loading",
    highScore: 0,
    secondsRemaining: null,
    answer: null,
    points: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "answeredCorrectly":
        return {
          ...state,
          points: state.points + action.payload,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "restart":
        return {
          ...state,
          index: 0,
          points: 0,
          answer: null,
          status: "active",
        };
      case "start":
        return {
          ...state,
          secondsRemaining: state.questions.length * 30,
          status: "active",
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      case "answer":
        return {
          ...state,
          answer: action.payload,
        };
      case "finish":
        return {
          ...state,
          answer: null,
          status: "finished",
          index: 0,
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      default:
        throw new Error("Action Unknown");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // Set timer for each question
  useEffect(function () {
    const timer = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch questions from API
  useEffect(function () {
    async function fetchData() {
      await fetch("http://localhost:3001/questions")
        .then((response) => response.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    }
    fetchData();
  }, []);
  const maxPoints = state.questions.reduce((prev, cur) => {
    return prev + cur.points;
  }, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "ready" && (
          <StartScreen questions={state.questions} dispatch={dispatch} />
        )}
        {state.status === "error" && <Error />}
        {state.status === "loading" && <Loader />}
        {state.status === "active" && (
          <>
            <Progress
              maxPoints={maxPoints}
              answer={state.answer}
              points={state.points}
              index={state.index}
              maxQuestions={state.questions.length}
            />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <Footer>
              <Timer secondsRemaining={state.secondsRemaining} />
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
