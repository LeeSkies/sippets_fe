import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

export const Title = ({ title }) => {

  const { loggedIn, user, logout } = useContext(UserContext)

  const navigate = useNavigate()

  return (
    <header className='flex py-8 items-center w-full justify-between px-3'>
      <section className='flex items-center'>
        <button onClick={() => navigate(-1)} className='pr-3'>
          <ArrowSmallLeftIcon className='w-5 h-5 font-bold' />
        </button>
        <h1 className=' text-2xl'>{title}</h1>
      </section>
      {loggedIn && <button onClick={() =>logout()} className='p-2 md:hidden bg-slate-700 text-slate-300 rounded'>logout</button>}
    </header>
  )
}
