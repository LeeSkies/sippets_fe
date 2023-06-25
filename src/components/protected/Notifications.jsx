import React, { useContext, useEffect, useState } from 'react'
import { Title } from '../common/Title'
import { NotificationsContext } from '../../context/notificationsContext'
import { useNavigate } from 'react-router-dom'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { SippetSkeleton } from '../utilities/SippetSkeleton'

export const Notifications = () => {
  
  const { notifications, loading } = useContext(NotificationsContext)

  const navigate = useNavigate()

  const [index, setIndex] = useState(-1)

  let timer
  useEffect(() => {
    if (index < notifications.length)
      timer = setInterval(() => {
        setIndex(prev => prev + 1)
      }, 70);
      
      return () => clearInterval(timer);
  }, [index])
    
  useEffect(() => {
    const updateNotifications = async () => {
      await axios.put(import.meta.env.VITE_URL + '/protected/buzz/', {}, { withCredentials: true })
    }
    const timer = setTimeout(() => {
      if (notifications.length > 0) updateNotifications()
    }, 10 * 1000);

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='w-full min-h-screen'>
      <Title title={'Notifications'} />
      {notifications.length > 0 ? <section className='flex flex-col p-2 space-y-5'>
        {notifications.length > 0 && notifications.map((n, i) => (
          <article key={i} className={`bg-slate-600 p-6 space-x-4 ${index < i ? '-translate-x-[110%]' : ''} duration-500  flex items-center rounded-xl text-neutral-300 font-bold`}>
            <ChevronDoubleRightIcon className='w-6 h-6' />
            <button onClick={() => navigate(n.link)} className={''}>
              {n.text}
            </button>
          </article>
        ))}
      </section>
      :
      <h1 className='w-full text-2xl text-center'>No unread notifications</h1>}
      {loading && new Array(5).fill(null).map((_, i) => <div key={i}>
        <SippetSkeleton count={1} w={100} h={'4rem'} icon={false} />
      </div>)
      }
    </div>
  )
}
