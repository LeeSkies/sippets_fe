import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageComp } from '../ImageComp'

export const UserResult = ({ result }) => {

  const navigate = useNavigate()

  const trimStr = (maxLen = 70) => {
    return result?.bio.length > maxLen ? result.bio.substring(0, maxLen) + '...' : result.bio
  }

  return (
    <button onClick={() => navigate('/user/' + result._id)} className='w-full flex p-2 hover:bg-sky-200 duration-200'>
      {result?.image?.secure_url ? <ImageComp w={'100px'} url={result.image.secure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')} />
      : <p className='rounded w-[100px] flex items-center justify-center h-[100px] bg-blue-600'>{result.username.charAt(0)}</p>}
      <section className='h-full flex flex-col justify-between'>
        <header className='text-lg font-bold'>{result.username}</header>
        <p>{trimStr()}</p>
        <footer></footer>
      </section>
    </button>
  )
}