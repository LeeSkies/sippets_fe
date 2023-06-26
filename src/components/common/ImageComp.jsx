import React from 'react'

export const ImageComp = ({ url, w = '100%', h = '100%' }) => {
  return (
    <figure style={{ width: w, height: h }}
    className='flex justify-center items-center overflow-clip'>
      <img src={url} className='min-w-full min-h-full object-cover' />
    </figure>
  )
}
