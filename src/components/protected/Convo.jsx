import { ArrowLeftIcon, ArrowDownIcon, CheckIcon, PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useContext, useEffect, useRef, useState } from 'react'
import TextAreaAutosize from 'react-textarea-autosize'
import { WebsocketContext } from '../../context/websocketContext'
import { UserContext } from '../../context/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../../services/axios'

export const Convo = () => {

    const { id } = useParams()

    const navigate = useNavigate()
    
    const { user } = useContext(UserContext)
    const { socket, auth, conversations, setConversations, currentReceiver, setCurrentReceiver } = useContext(WebsocketContext)

    const inputRef = useRef()
    const containerRef = useRef()

    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(0)
    const [receiver, setReceiver] = useState(null)
    const [conversation, setConversation] = useState(id != 0 ? id : null)

    const initiateConversation = async () => {
        const { data } = await instance.post(`/protected/conversation/${receiver._id}`, {},
        { withCredentials: true })
        setConversations(prev => [...prev, data])
        setConversation(data._id)
        const message = {
            conversation,
            sender: user._id,
            to: receiver._id,
            content: inputRef.current.value,
            received: false,
            read: false
        }
        inputRef.current.value
        socket.emit('message', auth, message, () => {
            setMessages([prev => [message, ...prev]])
        })
    }

    const sendMessage = () => {
        const message = {
            conversation,
            sender: user._id,
            to: receiver._id,
            content: inputRef.current.value,
            received: false,
            read: false
        }
        inputRef.current.value = ''
        socket.emit('message', auth, message, () => {
            setMessages(prev => [message, ...prev])
        })
    }

    useEffect(() => {
        if (!currentReceiver && !id) navigate(-1)
        if (socket) {
            socket.on('receive', ({ message }) => {
                setMessages(prev => [message, ...prev])
            })

            socket.on('received', ({ id }) => {
                setMessages(prev => prev.map(m => {
                    if (m._id === id) {
                        m.read = true
                    }
                    return m
                }))
            })
        }
        return () => setCurrentReceiver(null)
    }, [socket])

    useEffect(() => {
        const fetchMessages = async () => {
            const { data } = await instance.get('/protected/conversation/' + id + '?offset=' + page, { withCredentials: true })
            setMessages([...messages, ...data])
        }
        if (id != 0) {
            fetchMessages()
        }
    }, [page])

    useEffect(() => {
        if (containerRef.current && (!page || page < 1) && messages.length > 0) containerRef.current.scrollTop = containerRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (conversations.length > 0) {
            const currentConvo = conversations.find(c => c._id == id)
            if (currentConvo) {
                if (currentReceiver)
                    setReceiver(currentReceiver)
                else
                    setReceiver(currentConvo.participants.find(p => p._id != user._id))
            }
        }
    }, [conversations])

  return (
    receiver && <div className='w-full flex flex-col h-screen'>
        <header className='flex items-center p-2 py-4 bg-slate-500 w-full space-x-2 relative'>
            <button onClick={() => navigate(-1)}>
                <ArrowLeftIcon className='w-5 h-5' />
            </button>
            <UserCircleIcon className='w-8 h-8' />
            <p className='px-1'>{receiver.username}</p>
        </header>
        <section ref={containerRef} className='w-full grow flex flex-col overflow-y-scroll space-y-4 py-4 p-2 custom-scrollbar'>
            {messages.length % 20 == 0 && <button onClick={() => setPage(prev => prev + 1)} className='border-b border-b-slate-600 font-thin text-sm hover:opacity-40'>load more</button>}
            {messages.reverse().map((message, i) => (
                <article key={i} className={`flex max-w-[80%] ${message.sender == user._id ? 'self-end' : ''}`}>
                    <p className={`p-2 relative ${message.sender == user._id ? 'bg-blue-400 rounded-b-lg rounded-tl-lg' : 'bg-neutral-600 rounded-b-lg rounded-tr-lg'}`}>
                        {message.content}
                        {message.sender == user._id && <CheckIcon className='w-3 h-3 absolute -left-4 text-blue-400 bottom-1' />}
                    </p>
                </article>
            ))}
        </section>
        <footer className='w-full relative flex space-x-2 py-2 pb-4 px-2 bg-slate-500'>
        <button onClick={() => {
                if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
            }}
            className='absolute -top-9 hover:opacity-100 active:scale-95 rounded-full p-1 opacity-25 bg-slate-500 left-1/2 -translate-x-1/2'>
                <ArrowDownIcon className='w-5 h-5' />
            </button>
            <TextAreaAutosize ref={inputRef} maxRows={4} autoFocus={true} className='grow custom-scrollbar resize-none rounded-xl p-1 py-2 px-4 bg-slate-200 focus:outline-none caret-black text-slate-900' />
            <button onClick={() => messages.length > 0 || id != 0 ? sendMessage() : initiateConversation()} className='pt-2 self-start'>
                <PaperAirplaneIcon className='w-5 h-5 text-stone-400 relative' />
            </button>
        </footer>
    </div>
  )
}
