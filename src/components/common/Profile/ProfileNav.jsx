import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const ProfileNav = ({ _id, id, display, setDisplay, changeDisplay }) => {
  return (
    <nav className={`relative w-full border-t border-t-slate-600 flex [&_button]:text-center items-center [&_button]:p-4 [&_button]:grow bg-slate-700
    after:w-1/2 after:h-1 after:bg-slate-900 after:absolute after:bottom-0 after:left-0 ${display == 'sippets' ? '' : 'after:translate-x-[100%]'} after:duration-300`}>
      <button onClick={() => changeDisplay('sippets')}>
        Sippets
      </button>
      <button onClick={() => changeDisplay('comments')}>
        Comments
      </button>
    </nav>
  )
}
