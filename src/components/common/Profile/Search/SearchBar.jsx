import { ArrowPathRoundedSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'

export const SearchBar = () => {
    const inputRef = useRef()
    const [param, setParam] = useState('user')

    const handleChange = () => {
        setParam(prev => prev == 'language' ? 'user' : 'language')
    }
  return (
    <section className='w-full flex items-center overflow-clip bg-gradient-to-r from-sky-200 to-transparent pl-1'>
        <button onClick={handleChange} className='w-[100px] rounded-full p-[2px] px-2 space-x-1 border bg-slate-700 flex text-slate-300 items-center'>
            <p className='pb-1 grow'>{param}</p>
            <ArrowPathRoundedSquareIcon className='w-[12px] h-[12px]' />
        </button>
        <input ref={inputRef} autoFocus={true} type="text" className='p-2 grow bg-transparent focus:outline-none caret-neutral-900 text-neutral-900' />
        <button className=''>
            <MagnifyingGlassIcon className='w-6 h-6 text-sky-400 pr-2' />
        </button>
    </section>
  )
}
