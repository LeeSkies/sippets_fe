import React from 'react'
import { SettingsBanner } from './SettingsBanner'
import { PencilIcon } from '@heroicons/react/24/outline'

export const UsernameSettings = ({ edit, setEdit, open, handleClick }) => {
  return (
    <div className='w-full'>
        <SettingsBanner open={open} onClick={() => handleClick('Username')} text={'Username'} />
        {open.includes('Username') && <article className='px-2 py-4 flex items-center'>
          <input autoFocus={true} onChange={(e) => setEdit({...edit, username: e.target.value})} type="text" defaultValue={edit.username}
          className='p-2 w-full text-xl border-b bg-transparent focus:outline-none' />
          <div className='p-1'>
              <PencilIcon className='w-5 h-5' />
          </div>
        </article>}
    </div>
  )
}
