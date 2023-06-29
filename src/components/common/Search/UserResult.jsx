import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageComp } from '../ImageComp'

export const UserResult = ({ result }) => {

  const navigate = useNavigate()

  const trimStr = (maxLen = 70) => {
    return result?.bio.length > maxLen ? result.bio.substring(0, maxLen) + '...' : result.bio
  }

  return (
    <button onClick={() => navigate('/user/' + result._id)} className='w-full flex h-[150px] pb-2 hover:bg-sky-200 duration-200'>
      {result?.image?.secure_url ? <ImageComp h={'100%'} rounded={false} url={result.image.secure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')} />
      : <p className='rounded flex items-center justify-center h-full aspect-square bg-blue-600'>{result.username.charAt(0)}</p>}
      <section className='h-full w-full items-end flex flex-col justify-between p-2'>
        <header className='text-lg font-bold'>{result.username}</header>
        <p>{trimStr()}</p>
        <footer className='w-full flex justify-around'>
          <div className='flex space-x-1'></div>
          <div className='flex space-x-1'></div>
          <div className='flex space-x-1'></div>
        </footer>
      </section>
    </button>
  )
}