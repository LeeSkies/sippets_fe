import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageComp } from '../ImageComp'
import { UserIcon, UsersIcon } from '@heroicons/react/24/solid'

export const UserResult = ({ result }) => {

  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/user/' + result._id)} className='w-full flex pb-2 hover:bg-neutral-600 duration-200'>
      {result?.image?.secure_url ?
      <figure className={`flex justify-center aspect-square items-center overflow-hidden w-[100px] max-h-[100px] object-cover`}>
        <img src={result.image.secure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')} className='min-w-full min-h-full object-cover' />
      </figure>
      : <p className='flex items-center justify-center w-[100px] aspect-square bg-blue-600'>{result.username.charAt(0)}</p>}
      <section className='h-full w-full items-start text-start flex flex-col justify-between p-2'>
        <header className='text-lg font-bold'>{result.username}</header>
        <footer className='flex space-x-3'>
          <div className='flex space-x-1 text-black'>
            <p>{result.followersCount}</p>
            <UserIcon className='w-5 h-5' />
          </div>
          <div className='flex space-x-1 text-black'>
            <p>{result.followingCount}</p>
            <UsersIcon className='w-5 h-5' />
          </div>
        </footer>
      </section>
    </button>
  )
}