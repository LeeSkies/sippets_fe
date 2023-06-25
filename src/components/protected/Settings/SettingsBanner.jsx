import { ArrowDownIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const SettingsBanner = ({ text, onClick, open }) => {
  return (
    <button onClick={onClick} className='w-full flex justify-between p-2 border-b border-b-slate-600'>
      <p className='text-xl'>{text}</p>
      <figure>
        <ArrowDownIcon className={`w-5 h-5 duration-300 ${open.includes(text) ? 'rotate-180' : ''}`} />
      </figure>
    </button>
  )
}
