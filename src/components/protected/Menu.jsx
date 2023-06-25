import { ArrowSmallUpIcon, BellAlertIcon, BellIcon, Cog6ToothIcon, EnvelopeOpenIcon, HandThumbUpIcon, HomeModernIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import { TST } from '../../assets/icons/Icons'
import { useNavigate } from 'react-router-dom'
import { NotificationsContext } from '../../context/notificationsContext'
import axios from 'axios'
import { UserContext } from '../../context/userContext'

export const Menu = () => {

    const { notifications, setNotifications, setLoading } = useContext(NotificationsContext)
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const [isScrolled, setIsScrolled] = useState(false)

    const handleClick = (i, to) => {
        navigate(to)
    }

    const handleScroll = () => {
        const windowHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset
        const scrollableHeight = window.document.body.scrollHeight - windowHeight

        scrollTop > 0 && scrollTop < scrollableHeight ? setIsScrolled(true) : setIsScrolled(false)
    }

    window.onscroll = handleScroll
    
    const links = [
        {icon: <HomeModernIcon className='w-6 h-6' /> , name: 'Home', to: '/'},
        {icon: notifications.find(n => n.read == false) ?
            <BellAlertIcon className={'w-6 h-6 animate-wiggle animate-infinite text-rose-100'} />:
            <BellIcon className='w-6 h-6' />, name: 'Notifications', to: '/notifications'},
        {icon: <EnvelopeOpenIcon className='w-6 h-6' />, name: 'Messages', to: '/conversations'},
        {icon: <HandThumbUpIcon className='w-6 h-6' />, name: 'Liked', to: '/liked'},
        {icon: <UserIcon className='w-6 h-6' />, name: 'Profile', to: `/user/${user._id}`},
        {icon: <Cog6ToothIcon className='w-6 h-6' />, name: 'Settings', to: '/settings'},
    ]

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await axios.get(import.meta.env.VITE_URL + '/protected/buzz/unread', { withCredentials: true })
      setNotifications(data.map(n => {return {...n, new: true}}))
    }
    fetchNotifications()
    setLoading(false)
  }, [])

  return (
    <aside className='hidden sm:flex flex-col fixed justify-center max-lg:items-center p-2 lg:p-8 space-y-4  text-xl font-semibold'>
        <button onClick={() => navigate('/')} className='p-2 ml-1 rounded-full hover:scale-105 duration-500 self-start'><TST w={10} /></button>
        {links.map((link, i) => (
            <button onClick={() => handleClick(i, link.to)} key={i} className={`items-center flex flex-nowrap max-lg:self-start p-3 rounded-full hover:bg-slate-700`}>
                {link.icon} <p className='px-2 max-lg:hidden'>{link.name}</p>
            </button>
        ))}
        {isScrolled && <button className='p-3 hover:bg-slate-700 active:scale-90 flex items-center rounded-full self-start' onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
            <ArrowSmallUpIcon className='w-6 h-6' />
        </button>}
    </aside>
  )
}
