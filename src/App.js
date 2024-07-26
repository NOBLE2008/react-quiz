import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import { act, useEffect, useReducer } from "react";
import { type } from "@testing-library/user-event/dist/type";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Loader from "./Loader";
import Main from "./Main";
import Question from "./Question";
import NextButton from "./NextButton";

function App() {
  const initialState = {
    questions: [],
    index: 0,
    status: "loading",
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
  return (
    <div className="app">
      <Header/>
      <Main>
        {state.status === 'ready' && <StartScreen questions={state.questions} dispatch={dispatch}/>}
        {state.status === 'error' && <Error/>}
        {state.status === 'loading' && <Loader/>}
        {state.status === 'active' && <Question question={state.questions[state.index]} dispatch={dispatch} answer={state.answer}/>}
        <NextButton dispatch={dispatch} answer={state.answer}/>
      </Main>
    </div>
  );
}

export default App;
