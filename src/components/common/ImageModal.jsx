import React from 'react'

export const ImageModal = ({ cb, url }) => {

  const handleClick = (e) => {
    e.stopPropagation()
    cb(prev => !prev)
  }
  return (
    <div onClick={(e) => handleClick(e)} className='fixed inset-0 flex justify-center items-center !z-20 backdrop-blur-xl'>
        <article className='flex flex-col items-center md:max-w-[80%]'>
            <img src={url} alt="" />
            {/* <button onClick={() => cb(prev => !prev)} className='p-4 bg-red-600'>X</button> */}
        </article>
    </div>
  )
}
