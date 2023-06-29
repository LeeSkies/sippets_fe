import { ArrowPathRoundedSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import instance from '../../../services/axios'

export const SearchBar = ({ param, setParam, setResults }) => {
    
    let timeout

    const inputRef = useRef()

    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')

    const handleClick = () => {
        setResults([])
        inputRef.current.value = ''
        setParam(prev => prev == 'text' ? 'user' : 'text')
    }

    useEffect(() => {
        const handleChange = async () => {
            setLoading(true)
            if (value == '') {
                setResults([])
                setLoading(false);
                return
            }
            const { data } = await instance.get(`/public/search/${param}?text=${value}`);
            setResults(data)
            console.log(data);
            setLoading(false);
          }
        if (timeout) clearTimeout(timeout);
        setTimeout(() => {
            handleChange()
        }, 1000);

    }, [param, value])

  return (
    <section className='w-full flex items-center overflow-clip bg-neutral-500 pl-1'>
        <button onClick={handleClick} className='w-[100px] active:scale-95 duration-300 rounded-full p-[2px] px-2 space-x-1 bg-slate-700 flex text-slate-300 items-center'>
            <p className='pb-[2px] grow'>{param}</p>
            <ArrowPathRoundedSquareIcon className='w-[12px] h-[12px]' />
        </button>
        <input ref={inputRef} autoFocus={true} type="text" className='p-2 grow bg-transparent focus:outline-none caret-neutral-900 text-neutral-900' />
        <div disabled={true} className=''>
            {loading ? <div className='rounded-full h-6 w-6 border border-b-sky-400 animate-spin mr-2'></div>
            : <MagnifyingGlassIcon className='w-6 h-6 text-sky-400 pr-2' />}
        </div>
    </section>
  )
}
