import { ArrowPathIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { CommentContext } from '../../context/commentContext'
import { SippetMenu } from '../common/SippetMenu'
import instance from '../../services/axios'

export const SippetDisplayFooter = ({ sippet }) => {

    const { setCommentingOn } = useContext(CommentContext)
    const { loggedIn, user } = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(sippet.liked)
    const [isToasted, setIsToasted] = useState(sippet.toasted || false)
    const [menu, setMenu] = useState(false)

    const handleLike = async () => {
        if (!loggedIn) return;
        if (sippet.author._id == user._id) return
        try {
          const { data: {op} } = await instance.put(`/protected/sippet/like/${sippet._id}`,
            {},
            { withCredentials: true }
            );
          if (op === 'del') {
            sippet.likesCount --
            setIsLiked(false)
          }
          else if (op === 'add') {
            sippet.likesCount ++
            setIsLiked(true)
          }
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
    };

    const handleToast = async () => {
      if (sippet.is == 'toast') return;
        if (!loggedIn) return;
        if (sippet.author._id == user._id) return
        try {
            const { message } = await instance.post(
               + `/protected/sippet/toast/${sippet._id}`,
              {},
              { withCredentials: true }
              );
            if (message === 'success') {
              setIsToasted(true)
            }
          } catch (error) {
            console.log(error);
            alert(error.message);
          }
    }

    const handleClick = (e, cb) => {
      e.stopPropagation()
      cb()
    }

    const handleVeilClick = (e) => {
      e.stopPropagation();
      setMenu(false)
    }

  return (
    <footer className='relative flex py-2 mt-4 justify-between items-center border-y border-y-slate-600 text-neutral-300 [&_button]:p-2'>
        {menu && <div onClick={handleVeilClick} className='fixed cursor-default inset-0 z-10'></div>}
        <section className='flex space-x-4 [&_figure]:min-w-[60px]'>
            <figure className='flex items-center'>
                <button className='text-sky-500 hover:animate-wiggle-more hover:animate-infinite rounded-full'>
                    <ChatBubbleLeftIcon className='w-5 h-5' />
                </button>
                <p className='text-slate-500'>{sippet.commentsCount}</p>
            </figure>
            {sippet.is != 'toast' && <figure className='flex items-center'>
                <button onClick={(e) => loggedIn ? handleClick(e, handleToast) : e.stopPropagation()} className='text-green-700 hover:animate-spin ease-in-out rounded-full'>
                    <ArrowPathIcon className='w-5 h-5' />
                </button>
                <p className='text-slate-500'>{sippet.toastsCount}</p>
            </figure>}
            <figure className='flex items-center'>
                <button onClick={(e) => loggedIn ? handleClick(e, handleLike) : e.stopPropagation()} className={'hover:animate-heartbeat text-rose-800 rounded-full hover:text-rose-800'}>
                    {isLiked ? <SolidHeartIcon className='w-5 h-5 animate-jump' />
                    : <HeartIcon className='w-5 h-5' />}
                </button>
                <p className='text-slate-500'>{sippet.likesCount}</p>
            </figure>
        </section>
        {!loggedIn && <p className='relative text-slate-400 text-sm md:grow px-4 pb-1 italic'>Sign in to interact</p>}
        <button onClick={(e) =>  {e.stopPropagation(), setMenu(prev => !prev)}} className='text-neutral-300'>
            <EllipsisHorizontalIcon className='w-5 h-5' />
            {menu && <div className='absolute right-0 z-20'>
              <SippetMenu sippet={sippet} />
            </div>}
        </button>
    </footer>
  )
}
