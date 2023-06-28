import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useRef } from 'react'

export const SearchBar = () => {
    const inputRef = useRef()
  return (
    <section className='w-full flex items-center overflow-clip bg-gradient-to-r from-sky-200 to-transparent'>
        <input ref={inputRef} autoFocus={true} type="text" className='p-2 grow bg-transparent focus:outline-none caret-neutral-900 text-neutral-900' />
        <button className=''>
            <MagnifyingGlassIcon className='w-6 h-6 text-sky-400 pr-2' />
        </button>
    </section>
  )
}
