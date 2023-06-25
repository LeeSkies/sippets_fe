import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DiscoverItem = ({ user }) => {

    const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/user/' + user._id)} className='flex items-center w-full space-x-4 text-slate-800 bg-stone-300 rounded p-1'>
        <article>
            <img src={user.image.replace('upload/', 'upload/c_fill,h_200,w_200/')}
            alt={<p className="font-bold ">
                  {user.username.charAt(0).toUpperCase()}
                </p>} className='w-10 rounded aspect-square' />
        </article>
        <p className='text-xl'>{user.username}</p>
    </button>
  )
}
