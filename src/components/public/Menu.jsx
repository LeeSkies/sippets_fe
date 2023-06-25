import { ArrowSmallUpIcon, HomeModernIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { TST } from '../../assets/icons/Icons'

export const Menu = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    const handleScroll = () => {
        const windowHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset
        const scrollableHeight = window.document.body.scrollHeight - windowHeight

        scrollTop > 0 && scrollTop < scrollableHeight ? setIsScrolled(true) : setIsScrolled(false)
    }

    window.onscroll = handleScroll
    
  return (
    <aside className='flex flex-col justify-center max-lg:items-center p-2 md:p-8 space-y-4  text-xl font-semibold'>
        <button className='p-2 self-start'>
            <TST w={10} />
        </button>
        <NavLink to={'/'} className={'items-center hover:bg-slate-700 flex flex-nowrap max-lg:self-start p-3 rounded-full'}>
            <HomeModernIcon className='w-6 h-6' />
            <p className='px-2 max-lg:hidden'>Explore</p>
        </NavLink>
        {isScrolled && <button className='p-3 hover:bg-slate-700 active:scale-90 flex items-center rounded-full self-start' onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
            <ArrowSmallUpIcon className='w-6 h-6' />
        </button>}
    </aside>
  )
}