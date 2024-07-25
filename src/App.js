import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import { useEffect, useReducer } from "react";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  const initialState = {
    questions: [],

    status: "loading",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
        case "dataFailed": return {
          ...state,
          status: "error",
        }
      default:
        throw new Error("Action Unknown");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  // Fetch questions from API
  useEffect(function () {
    function fetch() {
      fetch("http://localhost:3001/questions")
        .then((response) => response.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data })).catch(err => dispatch({type: 'dataFailed'}));
    }
  }, []);
  return <Header />;
}

export default App;
