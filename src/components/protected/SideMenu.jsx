import React, { useContext, useEffect, useState } from 'react'
import { NotificationsContext } from '../../context/notificationsContext'
import { UserContext } from '../../context/userContext'
import { ArrowRightIcon, BellAlertIcon, BellIcon, Cog6ToothIcon, HandThumbUpIcon, HomeModernIcon, UserIcon } from '@heroicons/react/24/outline'
import instance from '../../services/axios'
import { NavLink } from 'react-router-dom'

export const SideMenu = ({ }) => {
    
    const { notifications, setNotifications } = useContext(NotificationsContext)
    const { user, logout } = useContext(UserContext)

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
        <button onClick={() => setOpen(prev => !prev)} className='flex flex-col space-y-[2px] w-6'>
            <div className='w-full rounded-full h-1 bg-black'></div>
            <div className='w-full rounded-full h-1 bg-black'></div>
            <div className='w-full rounded-full h-1 bg-black'></div>
        </button>
        <div className={`fixed flex items-center z-20 top-0 right-0 duration-300 ${open ? '' : 'translate-x-full'}`} >
            <button className='p-2 rounded-full text-black' onClick={() => setOpen(prev => !prev)}><ArrowRightIcon className='w-5 h-5'/></button>
            <section className={`p-3 rounded-bl flex flex-col items-center bg-neutral-950`}>
                {links.map((link, i) => (
                    <NavLink to={link.to} className='p-2'>{link.icon}</NavLink>
                ))}
                <button onClick={logout} className='text-red-700 p-2 pb-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                      <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                      <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                    </svg>
                </button>
            </section>
        </div>
    </aside>
  )
}
