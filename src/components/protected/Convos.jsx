import React, { useContext, useEffect, useState } from 'react'
import { Title } from '../common/Title'
import { WebsocketContext } from '../../context/websocketContext'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Convo } from './Convo'
import { UserContext } from '../../context/userContext'

export const Convos = () => {
    
    // const navigate = useNavigate()

    // const { user } = useContext(UserContext)
    // const { socket, auth, conversations } = useContext(WebsocketContext)

    // useEffect(() => {
    //     // axios.post(import.meta.env.VITE_URL + '/protected/conversation/all')
    // }, [])

  return (
    <section className='w-full'>
        <Title title={'Conversations'} />
        {/* <section className='p-2'>
            {conversations.map((convo, i) => (
                <button onClick={() => navigate(`/messages/${convo._id}`)} key={i}
                className='bg-stone-600 w-full rounded-xl flex items-center p-2 space-x-2'>
                    <div><UserCircleIcon className='w-12 h-12' /></div>
                    <p className='text-xl'>{convo.participants.find(p => p._id != user._id).username}</p>
                </button>
            ))}
                </section> */}
                <h1 className='w-full text-center p-2 text-lg'>
                    There was an amazing chat app here! sadly, Cyclic doesn't support RTC, go figure. so you're just gonna have to take my word for it! cheers!
                </h1>
        </section>
  )
}
