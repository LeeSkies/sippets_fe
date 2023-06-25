import React from 'react'

export const ProfileFollowBar = ({ user }) => {
  return (
    <div className='w-full text-sky-300 flex justify-between overflow-clip items-center my-4 space-x-1'>
      <p className='flex flex-col items-center grow justify-center p-1'>
        <span className='text-xl'>{user.followersCount}</span>
        <span className='text-slate-400 text-sm font-thin'>followers</span>
      </p>
      <p className='flex flex-col items-center grow justify-center p-1'>
        <span className='text-xl'>{user.followingCount}</span>
        <span className='text-slate-400 text-sm font-thin'>following</span>
      </p>
    </div>
  )
}
