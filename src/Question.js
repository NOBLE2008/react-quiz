import React from 'react'
import Options from './Options'

export default function Question({question, answer, dispatch}) {
  return (
    <div>
      <h4>{question.question}</h4>
    <div className='options'>
        {question.options.map((option, i) => <Options option={option} dispatch={dispatch} key={i} index={i} answer={answer} question={question}/>)}
    </div>
    </div>
  )
}
