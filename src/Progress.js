import React from 'react'

export default function Progress({maxQuestions, answer, points, maxPoints, index}) {
    let inc = 0;
    if(answer !== null) inc = 1;
        
  return (
    <header className='progress'>
      <progress max={maxQuestions} value={index + inc}/>
      <p>Question <strong>{index + 1}</strong>/{maxQuestions}</p>
      <p><strong>{points}</strong>/{maxPoints}</p>
    </header>
  )
}
