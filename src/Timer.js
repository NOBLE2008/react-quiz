import React, { useEffect } from 'react'

export default function Timer({secondsRemaining, dispatch}) {
    const minutes = Math.floor(secondsRemaining/60)
    const hours = Math.floor(secondsRemaining/3600)
    const seconds = Math.floor(secondsRemaining % 60)
  return (
    <div className='timer'>
      {hours < 10 && 0}{hours}:{minutes < 10 && 0}{minutes}:{seconds < 10 && 0}{seconds}
    </div>
  )
}
