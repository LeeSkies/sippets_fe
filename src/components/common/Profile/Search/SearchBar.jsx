import { ArrowPathRoundedSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'

export const SearchBar = () => {
    const inputRef = useRef()
    const [param, setParam] = useState('user')

    const handleChange = () => {
        setParam(prev => prev == 'language' ? 'user' : 'language')
    }
  return (
    <section className='w-full flex items-center overflow-clip bg-gradient-to-r from-sky-200 to-transparent'>
        <button className='w-[100px] rounded-full p-1 bg-sky-300 flex justify-center items-center'>
            <p>{param}</p>
            <ArrowPathRoundedSquareIcon className='w-3 h-3 text-slate-300' />
        </button>
        <input ref={inputRef} autoFocus={true} type="text" className='p-2 grow bg-transparent focus:outline-none caret-neutral-900 text-neutral-900' />
        <button className=''>
            <MagnifyingGlassIcon className='w-6 h-6 text-sky-400 pr-2' />
        </button>
    </section>
  )
}
