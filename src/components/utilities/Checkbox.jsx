import React, { useState } from 'react'

export const Checkbox = ({ w = 8, color = 'black', checked = false }) => { 

  return (
    <div className='p-[1px] cursor-pointer flex items-center justify-center border-2 rounded-full w-fit h-fit'>
        <div style={{
            backgroundColor: checked ? color : 'white',
            width: w + 'px',
            height: w + 'px'
        }}
        className='aspect-square rounded-full'></div>
    </div>
  )
}
