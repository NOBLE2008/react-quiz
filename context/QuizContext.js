import React, { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

function useQuiz(){
    const context = useContext(QuizContext)
    if(!context){
        throw new Error("QuizProvider must be a parent")
    }
    return context
}
function QuizProvider({children}) {
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
              status: "ready",
              secondsRemaining: null,
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

      const maxPoints = state.questions.reduce((prev, cur) => {
        return prev + cur.points;
      }, 0);
      useEffect(
        function () {
          //Heart of the Timer
          const timer = setInterval(function () {
            dispatch({ type: "tick" });
          }, 1000);
          //Clean up Function
          return function () {
            clearInterval(timer);
          };
        },
        [dispatch]
      );
      useEffect(function () {
        async function fetchData() {
          await fetch("http://localhost:3001/questions")
            .then((response) => response.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
        }
        fetchData();
      }, []);
  return (
    <QuizContext.Provider value={{
        state,
        maxPoints
    }}>
        {children}
    </QuizContext.Provider>
  )
}

export { QuizProvider, useQuiz }
