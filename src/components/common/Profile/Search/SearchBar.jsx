import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useRef } from 'react'

export const SearchBar = () => {
    const inputRef = useRef()
  return (
    <section className='w-full rounded-full flex overflow-clip bg-gradient-to-r from-sky-300 to-slate-300'>
        <input ref={inputRef} type="text" className='p-2 grow bg-transparent' />
        <button className=''>
            <MagnifyingGlassIcon className='w-6 h-6' />
        </button>
    </section>
  )
}
