import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/userContext'

export const UserBar = () => {

  const { logout, user: {username} } = useContext(UserContext)
  
    return (
    <div className='text-slate-700 w-full justify-center max-lg:items-center py-4'>
      <section className='rounded-b text-slate-300 flex items-center flex-col space-y-5 border-x border-b border-slate-600 p-2'>
        <p className='text-xl'>Hello {username}</p>
        <button onClick={() =>logout()} className='p-2 bg-slate-700 text-slate-300 rounded w-full'>logout</button>
      </section>
    </div>
  )
}
