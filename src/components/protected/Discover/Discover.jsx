import React, { useEffect, useState } from 'react'
import { DiscoverItem } from './DiscoverItem'
import instance from '../../../services/axios'
import { SippetSkeleton } from '../../utilities/SippetSkeleton'

export const Discover = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchWhoToFollow = async () => {
      const { data } = await instance.get('/protected/user/discover', { withCredentials: true });
      setUsers(data)
    }
    fetchWhoToFollow()
  }, [])
  return (
    <div className='w-full py-4'>
      <p className='font-extralight italic text-lg pb-1 pl-2'>You might be interested in:</p>
      <section className='border rounded border-slate-600 p-2 space-y-4'>
        {users.length <= 0
        ? <SippetSkeleton count={5} />
        : users.map((user, i) => (
          <div key={i}>
            <DiscoverItem user={user} />
          </div>
        ))}
      </section>
    </div>
  )
}
