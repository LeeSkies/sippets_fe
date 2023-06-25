import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../Title';
import { SippetsFeed } from '../../sippets/SippetsFeed';
import { UserContext } from '../../../context/userContext';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
// import { WebsocketContext } from '../../../context/websocketContext';
import { ProfileNav } from './ProfileNav';
import { ProfileFollowBar } from './ProfileFollowBar';
import { ImageModal } from '../ImageModal';
import instance from '../../../services/axios';

export const Profile = () => {

  const { id } = useParams()

  const { user: { _id } } = useContext(UserContext)
  // const { conversations, setCurrentReceiver } = useContext(WebsocketContext)

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [sippets, setSippets] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState('sippets')
  const [page, setPage] = useState(0)
  const [bio, setBio] = useState(false)
  const [modal, setModal] = useState(false)

  const trimString = (str, charLimit) => {
    const index = str.substring(0, charLimit).lastIndexOf(' ');
    return str.substring(0, index)
  }
  
  const fetchComments = async () => {
    const { data } = await instance.get( + `/public/sippet/comments/${id}?offset=${comments.length / 10}`, {
        withCredentials: true,
      })
    setComments([...comments, ...data])
    setLoading(false)
    return
  }
  const fetchSippets = async () => {
    const { data } = await instance.get( + `/public/sippet/user/${id}?offset=${sippets.length / 10}`, {
        withCredentials: true,
      })
    setSippets([...sippets, ...data])
    setLoading(false)
    return
  }

  const changeDisplay = async (type) => {

    if (type == 'comments' && comments.length <= 0)
      fetchComments()
    setDisplay(type)
  }

  // const handleChatNavigation = () => {
  //   const is = conversations.find(c => c.participants.find(p => p._id == user._id))
  //   if (is) navigate('/messages/' + is._id)
  //   else {
  //     setCurrentReceiver(user)
  //     navigate('/messages/0')  
  //   }
  // }

  useEffect(() => {
    const fetchUser = async () => {
        const { data } = await instance.get( + `/public/user/${id}`)
        setUser(data)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (display == 'sippets') {
      fetchSippets()
    }
    else {
      fetchComments()
    }
  }, [page])

  return (
    user && <div className="relative bg-no-repeat bg-cover flex flex-col items-center w-full min-h-screen [&_*]:-10 pb-4" >
      <div className='absolute -z-10 w-full left-0 right-0 top-0 h-[90vh] bg-gradient-to-b from-[#1e1e1f] to-transparent pb-20'>
      </div>
      <header className='self-start'>
        <Title title={'Profile'} />
      </header>
      <section className='w-full p-3'>
        <article className='w-full p-1 pb-8 border-b border-b-slate-600 items-center flex flex-col space-y-3'>
          {/* {user.image ? 
          <img onClick={(e) => {e.stopPropagation(), setModal(prev => !prev)}}
          src={user.image.replace('upload/', 'upload/c_scale,w_0.50/')} className='rounded-md w-full min-h-full' />
          :
          <figure className='bg-gradient-to-b from-sky-900 to-red-300 h-[300px] w-[300px] flex justify-center items-center text-4xl font-bold text-slate-800 aspect-square mx-auto rounded-md'>
            {user.username.charAt(0).toUpperCase()}
          </figure>} */}
          {modal &&
            <ImageModal url={user.image} cb={setModal} />}
          <div className='w-full text-2xl flex justify-between py-2 font-thin border-b border-b-slate-600'>
            <div className='flex items-center space-x-2'>
              <span>{user.username}</span>
              {/* {_id != user._id && <button onClick={handleChatNavigation} className='hover:text-slate-500'>
                <EnvelopeIcon className='w-6 h-6' />
              </button>} */}
            </div>
            <span>Bio</span>
          </div>
          <div className='container box-content'>
            <p className='bg-transparent w-full whitespace-pre-line text-sm'>
              {user.bio && bio ? user.bio : trimString(user.bio, 400)}
            </p>
          </div>
          {user.bio && user.bio.length >= 400 && <button onClick={() => setBio(prev => !prev)} className='text-blue-300 self-start'>{bio ? 'close' : 'read more'}</button>}
        </article>
          <ProfileFollowBar user={user} />
          <ProfileNav _id={_id} id={id} display={display} setDisplay={setDisplay} changeDisplay={changeDisplay} />
      </section>
      <SippetsFeed sippets={display == 'sippets' ? sippets : comments} />
      {!loading && (display === 'sippets' ? sippets.length : comments.length) != 0 && (display === 'sippets' ? sippets.length : comments.length) % 10 == 0 && <button onClick={() => setPage(page + 1)}
        className='w-full p-2 hover:bg-slate-800 duration-300'>
        load more
      </button>}
    </div>
  )
}
