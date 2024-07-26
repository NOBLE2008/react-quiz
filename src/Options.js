import React from 'react'

export default function Options({option, dispatch, index, answer, question}) {
  return (
   <button className={`btn btn-option ${index === answer ? 'answer': ''} ${answer !== null && (index === question.correctOption ? 'correct' : 'wrong')}`} onClick={() => {
        dispatch({type: 'answer', payload: index})
   }}>{option}</button>
  )
}
