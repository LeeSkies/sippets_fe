import { ArrowPathRoundedSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'
import instance from '../../../../services/axios'
import { debounce } from 'lodash'

export const SearchBar = ({ setResults }) => {
    const inputRef = useRef()
    const [param, setParam] = useState('text')

    const handleClick = () => {
        setResults([])
        inputRef.current.value = ''
        setParam(prev => prev == 'text' ? 'user' : 'text')
    }

    const onReset = () => {
        setResults([])
    }

    const debouncedOnChange = debounce(async () => {
        const val = inputRef.current.value;
        const { data } = await instance.get(`/public/search/${param}?text=${val}`);
        setResults(data)
      }, 2000);

  return (
    <section className='w-full flex items-center overflow-clip bg-gradient-to-r from-sky-200 to-neutral-900 pl-1'>
        <button onClick={handleClick} className='w-[100px] active:scale-95 duration-300 rounded-full p-[2px] px-2 space-x-1 border bg-slate-700 flex text-slate-300 items-center'>
            <p className='pb-[2px] grow'>{param}</p>
            <ArrowPathRoundedSquareIcon className='w-[12px] h-[12px]' />
        </button>
        <input ref={inputRef} onChange={inputRef.current.value.length > 0 ? debouncedOnChange : onReset} autoFocus={true} type="text" className='p-2 grow bg-transparent focus:outline-none caret-neutral-900 text-neutral-900' />
        <button className=''>
            <MagnifyingGlassIcon className='w-6 h-6 text-sky-400 pr-2' />
        </button>
    </section>
  )
}
