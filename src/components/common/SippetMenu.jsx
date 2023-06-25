import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { ConfirmModal } from './ConfirmModal'
import { toast } from 'react-toastify'
import { SippetsContext } from '../../context/sippetsContext'
import instance from '../../services/axios'

export const SippetMenu = ({ sippet }) => {

  const { user } = useContext(UserContext)
  const { setLatestSippets } = useContext(SippetsContext)

  const [copied, setCopied] = useState(false)
  const [modal, setModal] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(document.location.href)
      setCopied(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    if (user._id != sippet.author._id) return
    try {
      await instance.delete(import.meta.env.VITE_URL + '/protected/sippet/' + sippet._id, { withCredentials: true })
    } catch (error) {
      console.log(error.message)
      toast('an error occurred, please try again later')
    }
  }

  const handleClick = (e, cb) => {
    e.stopPropagation()
    cb()
  }

  return (
    <article className='flex flex-col bg-slate-700 min-w-[100px] right-0 rounded-md overflow-clip'>
      {modal && <ConfirmModal text={'Are you sure you want to delete this sippet?'} onAction={handleDelete} onClose={() => setModal(false)} />}
      <div onClick={(e) => handleClick(e, handleShare)} className='cursor-pointer hover:bg-slate-500 p-2'>
        {copied ? 'copied!' : 'share link'}
      </div>
      {/* {user && user._id == sippet.author._id && <div onClick={(e) => handleClick(e, () => setModal(true))} className='cursor-pointer p-2 hover:bg-slate-500 text-rose-500 hover:bg-slate-5000'>
        delete sippet
      </div>} */}
    </article>
  )
}
