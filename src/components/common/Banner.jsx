import React from 'react'
import { TST } from '../../assets/icons/Icons'

export const Banner = () => {
  return (
    <div className='absolute inset-0 bg-gradient-to-br from-zinc-900 to-slate-900 flex items-center justify-center'>
        <article className='flex space-x-8 border-black items-center'>
            {/* <TST w={80} /> */}
            <div className='bg-gradient-to-r from-sky-600 to-slate-200 bg-clip-text'>
                <h1 className='xl:text-[200px] md:text-[150px] text-transparent font-bold'>SIPPETS</h1>
            </div>
        </article>
    </div>
  )
}
