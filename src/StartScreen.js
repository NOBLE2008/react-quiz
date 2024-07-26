import React from 'react'

export default function StartScreen({questions, dispatch}) {
  return (
    <div className='start'>
      <h2>Welcome to React Quiz</h2>
      <h3>{questions.length} questions to test your React Mastery</h3>
      <button className='btn' onClick={() => {
        dispatch({type: 'start'})
      }}>Let's Start</button>  
    </div>
  )
}
