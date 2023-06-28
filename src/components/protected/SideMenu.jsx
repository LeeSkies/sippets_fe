import React, { useContext, useEffect, useState } from 'react'
import { NotificationsContext } from '../../context/notificationsContext'
import { UserContext } from '../../context/userContext'
import { ArrowRightIcon, BellAlertIcon, BellIcon, Cog6ToothIcon, HandThumbUpIcon, HomeModernIcon, UserIcon } from '@heroicons/react/24/outline'
import instance from '../../services/axios'
import { NavLink } from 'react-router-dom'

export const SideMenu = ({ }) => {
    
    const { notifications, setNotifications } = useContext(NotificationsContext)
    const { user } = useContext(UserContext)

    const [open, setOpen] = useState(false)

    const links = [
        {icon: <HomeModernIcon className='w-6 h-6' /> , name: 'Home', to: '/'},
        {icon: notifications.find(n => n.read == false) ?
            <BellAlertIcon className={'w-6 h-6 animate-wiggle animate-infinite text-rose-100'} />:
            <BellIcon className='w-6 h-6' />, name: 'Notifications', to: '/notifications'},
        // {icon: <EnvelopeOpenIcon className='w-6 h-6' />, name: 'Messages', to: '/conversations'},
        {icon: <HandThumbUpIcon className='w-6 h-6' />, name: 'Liked', to: '/liked'},
        {icon: <UserIcon className='w-6 h-6' />, name: 'Profile', to: `/user/${user._id}`},
        {icon: <Cog6ToothIcon className='w-6 h-6' />, name: 'Settings', to: '/settings'},
    ]

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await instance.get('/protected/buzz/unread', { withCredentials: true })
      setNotifications(data.map(n => {return {...n, new: true}}))
    }
    if (notifications.length <= 0) fetchNotifications()
  }, [])

  return (
    <aside>
        <button onClick={() => setOpen(prev => !prev)} className='flex flex-col space-y-1 w-7'>
            <div className='w-full rounded-full h-1 bg-black'></div>
            <div className='w-full rounded-full h-1 bg-black'></div>
            <div className='w-full rounded-full h-1 bg-black'></div>
        </button>
        <div className={`fixed flex items-center z-20 top-0 right-0 duration-300 ${open ? '' : 'translate-x-full'}`} >
            <button className='p-2 rounded-full' onClick={() => setOpen(prev => !prev)}><ArrowRightIcon className='w-5 h-5'/></button>
            <section className={`p-3 rounded-bl bg-neutral-950`}>
                {links.map((link, i) => (
                    <NavLink to={link.to} className='p-2'>{link.icon}</NavLink>
                ))}
            </section>
        </div>
    </aside>
  )
}
