import React, { useContext, useEffect } from 'react'
import { NotificationsContext } from '../../context/notificationsContext'
import { UserContext } from '../../context/userContext'
import { BellAlertIcon, BellIcon, Cog6ToothIcon, HandThumbUpIcon, HomeModernIcon, UserIcon } from '@heroicons/react/24/outline'
import instance from '../../services/axios'

export const SideMenu = ({ }) => {
    
    const { notifications, setNotifications, setLoading } = useContext(NotificationsContext)
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
        <button onClick={setOpen(prev => !prev)} className='flex flex-col space-y-2 w-10'>
            <div className='w-full rounded-full h-2 bg-black'></div>
            <div className='w-full rounded-full h-2 bg-black'></div>
            <div className='w-full rounded-full h-2 bg-black'></div>
        </button>
        <section className={`duration-300 ${open ? '' : 'translate-x-full'}`}>
            {links.map((link, i) => (
                <div className='p-2'>{link.name}</div>
            ))}
        </section>
    </aside>
  )
}
