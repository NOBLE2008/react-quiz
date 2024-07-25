import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import { useEffect, useReducer } from "react";

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
        .then((data) => dispatch({ type: "dataReceived", payload: data }));
    }
  }, []);
  return <Header />;
}

export default App;
