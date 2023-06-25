import React from 'react'

export const Dot = ({ w }) => {
  return (
    <div style={{
        padding: `${w ? w : 4}px`
    }}>
        <div className='h-1 w-1 bg-black rounded-full'></div>
    </div>
  )
}
