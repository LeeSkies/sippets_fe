import React from 'react'
import { SettingsBanner } from './SettingsBanner'
import TextareaAutosize from 'react-textarea-autosize'

export const BioSettings = ({ edit, setEdit, open, handleClick }) => {
  return (
    <div className='w-full'>
        <SettingsBanner open={open} onClick={() => handleClick('Bio')} text={'Bio'} />
        {open.includes('Bio') && <article className='px-2'>
          <TextareaAutosize spellCheck={false} autoFocus={true} onChange={(e) => setEdit({...edit, bio: e.target.value})} type="text" defaultValue={edit.bio}
          className='p-2 w-full font-thin text-md border-b bg-transparent focus:outline-none custom-scrollbar resize-none' />
        </article>}
    </div>
  )
}
