import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserHeader } from './UserHeader'

export const UserResult = ({ result }) => {

  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/user/' + result._id)} className='w-full p-2 hover:bg-sky-200 duration-200'>
      <UserHeader result={result} />
      <footer>Footer</footer>
    </button>
  )
}