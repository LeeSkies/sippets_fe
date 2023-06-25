import { Bars4Icon, BellAlertIcon, BellIcon, EnvelopeOpenIcon, HandThumbUpIcon, HomeModernIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotificationsContext } from '../../context/notificationsContext'
import { UserContext } from '../../context/userContext'
import instance from '../../services/axios'

export const FloatingMenu = () => {

    const { notifications, setNotifications, setLoading } = useContext(NotificationsContext)
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const [open, setOpen] = useState(true)

    const handleClick = (i, to) => {
        navigate(to)
    }
    
    const links = [
        {icon: <HomeModernIcon className='w-6 h-6' /> , name: 'Home', to: '/'},
        {icon: notifications.find(n => n.read == false) ?
            <BellAlertIcon className={'w-6 h-6 animate-wiggle animate-infinite text-rose-100'} />:
            <BellIcon className='w-6 h-6' />, name: 'Notifications', to: '/notifications'},
        {icon: <EnvelopeOpenIcon className='w-6 h-6' />, name: 'Messages', to: '/conversations'},
        {icon: <HandThumbUpIcon className='w-6 h-6' />, name: 'Liked', to: '/liked'},
        {icon: <UserIcon className='w-6 h-6' />, name: 'Profile', to: `/user/${user._id}`},
    ]

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await instance.get(import.meta.env.VITE_URL + '/protected/buzz/unread', { withCredentials: true })
      setNotifications(data.map(n => {return {...n, new: true}}))
    }
    fetchNotifications()
    setLoading(false)
  }, [])

  return (
    <aside className={`flex flex-col bg-transparent space-y-2 fixed bottom-20 right-5 sm:hidden items-center justify-center rounded-full z-20 text-xl font-semibold`}>
            {links.map((link, i) => (
                <button onClick={() => handleClick(i, link.to)} key={i}
                className={`items-center flex flex-nowrap z-20 p-3 rounded-full duration-300 bg-slate-700`}
                style={{transform: `translateY(${open ? '0px' : `${115*(links.length - i)}%`})`}}>
                    {link.icon}
                </button>
            ))}
        <button onClick={() => setOpen(prev => !prev)}
        className={`rounded-full duration-300 bg-slate-700 z-30 active:scale-95 p-3 hover:bg-slate-600`}>
          <Bars4Icon className='w-5 h-5' />
        </button>
    </aside>
  )
}
