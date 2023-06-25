import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const ProfileNav = ({ _id, id, display, setDisplay, changeDisplay }) => {
  return (
    <nav className={`relative w-full border-t border-t-slate-600 flex [&_button]:text-center items-center [&_button]:p-4 [&_button]:grow bg-slate-700`}>
      <button className={`duration-300 ${display == 'sippets' ? 'text-slate-900' : ''}`} onClick={() => changeDisplay('sippets')}>
        Sippets
      </button>
      <button className={`duration-300 ${display == 'comments' ? 'text-slate-900' : ''}`} onClick={() => changeDisplay('comments')}>
        Comments
      </button>
    </nav>
  )
}
