import React from 'react'

export const WordMessier = ({ word }) => {
    const letters = 'new!'.split('');
  
  return (
    <span className='flex space-x- animate-bounce text-green-100'>{letters.map((l, i) => <p key={i} style={{
        rotate: `${i%2 == 0 ? -2 : 2}deg`
    }}>{l}</p>)}</span>
  )
}
