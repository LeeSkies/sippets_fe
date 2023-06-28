import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useRef } from 'react'

export const SearchBar = () => {
    const inputRef = useRef()
  return (
    <section className='w-full rounded-full flex'>
        <input ref={inputRef} type="text" className='p-2 grow' />
        <button className=''>
            <MagnifyingGlassIcon className='w-6 h-6' />
            </button>
    </section>
  )
}
