import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageComp } from '../ImageComp'

export const UserResult = ({ result }) => {

  const navigate = useNavigate()
console.log(result);
  return (
    <button onClick={() => navigate('/user/' + result._id)} className='w-full p-2 hover:bg-sky-200 duration-200'>
      {/* <ImageComp w={'100px'} url={result.image.scure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')} />
      <footer></footer> */}
    </button>
  )
}