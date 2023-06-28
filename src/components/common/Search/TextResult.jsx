import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import { UserHeader } from './UserHeader'

export const TextResult = ({ result }) => {

    const navigate = useNavigate()

    const buildStr = (maxLen) => {
        let sb = ''
        result.blocks.map(b => {
            if (sb.length > maxLen) return
            const len = maxLen - sb.length
            sb = sb + b.value.substring(0, len)
        })
        return sb
    }

  return (
    <button onClick={() => navigate('/sippet/' + result._id)} className='w-full p-2 hover:bg-sky-200 duration-200'>
        <UserHeader result={result} />
        <p className='font-bold text-sm w-full text-left py-2'>{buildStr(70)}...</p>
        <footer className='w-full flex justify-between'>
            <p>{result.blocks.find(b => b.type === 'code') ? result.language + ' code' : 'no code'}</p>
            <p className='flex items-center space-x-1'>
                <p className='italic pr-2 pb-[2px]'>{moment(result.createdAt).fromNow()}</p>
                <p className='text-rose-800'>{result.likesCount}</p>
                <HeartIcon className='w-5 h-5 text-rose-800' />
            </p>
        </footer>
    </button>
  )
}

