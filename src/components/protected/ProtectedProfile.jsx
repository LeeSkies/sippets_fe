import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import instance from '../../services/axios';
import { Title } from '../common/Title';
import { ImageModal } from '../common/ImageModal';
import { ProfileFollowBar } from '../common/Profile/ProfileFollowBar';
import { ProfileNav } from '../common/Profile/ProfileNav';
import { SippetsFeed } from '../sippets/SippetsFeed';

export const ProtectedProfile = () => {

  const { id } = useParams()

  const { user: current, loggedIn } = useContext(UserContext)

  const [user, setUser] = useState(null)
  const [sippets, setSippets] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState('sippets')
  const [page, setPage] = useState(1)
  const [bio, setBio] = useState(false)
  const [modal, setModal] = useState(false)
  const [followed, setFollowed] = useState(user?.followed)

  const trimString = (str, charLimit) => {
    const index = str.substring(0, charLimit).lastIndexOf(' ');
    return str.substring(0, index)
  }
  
  const fetchComments = async () => {
    const { data } = await instance.get(`/public/sippet/comments/${id}?offset=${comments.length / 10}`, {
        withCredentials: true,
      })
    setComments([...comments, ...data])
    setLoading(false)
    return
  }
  const fetchSippets = async () => {
    const { data } = await instance.get(`/public/sippet/user/${id}?offset=${sippets.length / 10}`, {
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

  const handleFollow = async () => {
    if (!loggedIn) return;
    setLoading(true)
    try {
      if (current._id == user._id) throw new Error("Cannot follow self");
      const { data } = await instance.put(`/protected/user/follow/${user._id}`,
        {},
        { withCredentials: true }
      );
      if (data.op === "del") {
        setFollowed(false);
        toast.success('Updated successfully')
      } else if (data.op === "add") {
        setFollowed(true);
      }
      setFollowingSippets([])
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  useEffect(() => {
    const fetchUser = async () => {
        const { data } = await instance.get(`/protected/user/single/${id}`)
        setUser(data)
        console.log(data);
        setFollowed(data.followed)
    }
    if (id == current._id)
      setUser(current)
    else
      fetchUser()
  }, [id])

  useEffect(() => {
    setSippets([])
    setComments([])
    setPage(prev => prev + 1)
  }, [user])

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
        <article className='w-full p-1 pb-8 border-b border-b-slate-600 items-center flex flex-col space-y-3 object-cover'>
          {user.image ? 
          <img onClick={(e) => {e.stopPropagation(), setModal(prev => !prev)}}
          src={user.image.secure_url.replace('upload/', 'upload/c_scale,w_0.50/')} className='rounded-md object-cover w-full aspect-square min-h-full' />
          :
          <figure className='bg-gradient-to-b from-sky-900 to-red-300 w-full flex justify-center items-center text-4xl font-bold text-slate-800 aspect-square mx-auto rounded-md'>
            {user.username.charAt(0).toUpperCase()}
          </figure>}
          {modal &&
            <ImageModal url={user.image.secure_url} cb={setModal} />}
          <div className='w-full text-2xl flex justify-between py-2 font-thin border-b border-b-slate-600'>
            <div className='flex items-center space-x-2'>
              <span>{user.username}</span>
            </div>
            <div className='flex space-x-2'>
              {loggedIn && current._id != id && (
                <button disabled={loading}
                  onClick={(e) => handleFollow()}
                  className={`flex justify-center text-base font-normal items-center rounded text-neutral-300 w-20 h-7 border border-neutral-700 active:scale-95 shadow-slate-100 duration-300 ${
                    loggedIn && followed ? "bg-neutral-800" : "bg-neutral-700"
                  }`}
                >
                  {loading ? <div className='rounded-full h-3 w-3 border border-b-sky-400 animate-spin'></div> : loggedIn && followed ? "following" : "follow"}
                </button>
              )}
              <span>Bio</span>
            </div>
          </div>
          <div className='container box-content'>
            <p className='bg-transparent w-full whitespace-pre-line text-sm'>
              {user.bio && bio ? user.bio : trimString(user.bio, 400)}
            </p>
          </div>
          {user.bio && user.bio.length >= 400 && <button onClick={() => setBio(prev => !prev)} className='text-blue-300 self-start'>{bio ? 'close' : 'read more'}</button>}
        </article>
          <ProfileFollowBar user={user} />
          <ProfileNav display={display} setDisplay={setDisplay} changeDisplay={changeDisplay} />
      </section>
      <SippetsFeed sippets={display == 'sippets' ? sippets : comments} />
      {!loading && (display === 'sippets' ? sippets.length : comments.length) != 0 && (display === 'sippets' ? sippets.length : comments.length) % 10 == 0 && <button onClick={() => setPage(page + 1)}
        className='w-full p-2 hover:bg-slate-800 duration-300'>
        load more
      </button>}
    </div>
  )
}
