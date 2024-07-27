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

function App() {
  const initialState = {
    questions: [],
    index: 0,
    status: "loading",
    highScore: 0,
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
        case "answeredCorrectly": return {
          ...state,
          points: state.points + action.payload,
        }
        case "nextQuestion": return {
          ...state,
          index: state.index + 1,
          answer: null,
        }
        case "dataFailed": return {
          ...state,
          status: "error",
        }
        case "start": return {
          ...state,
          status: "active",
        }
        case "answer": return {
         ...state,
          answer: action.payload,
        }
        case "finish": return{
          ...state,
          answer: null,
          status: "finished",
          index: 0,
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        }
      default:
        throw new Error("Action Unknown");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  // Fetch questions from API
  useEffect(function () {
    async function fetchData() {
      await fetch("http://localhost:3001/questions")
        .then((response) => response.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data })).catch(err => dispatch({type: 'dataFailed'}));
    }
    fetchData()
  }, []);
  const maxPoints = state.questions.reduce((prev, cur) => {
    return prev + cur.points
  }, 0)
  return (
    <div className="app">
      <Header/>
      <Main>
        {state.status === 'ready' && <StartScreen questions={state.questions} dispatch={dispatch}/>}
        {state.status === 'error' && <Error/>}
        {state.status === 'loading' && <Loader/>}
        {state.status === 'active' && <Question question={state.questions[state.index]} dispatch={dispatch} answer={state.answer}/>}
        {state.status === 'finished' && <Finish points={state.points} dispatch={dispatch} highScore={state.highScore} maxPoints={maxPoints}/>}
        <NextButton dispatch={dispatch} answer={state.answer} questions={state.questions} index={state.index}/>
      </Main>
    </div>
  );
}

export default App;
