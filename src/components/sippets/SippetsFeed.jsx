import React from 'react'
import { SippetDisplay } from './SippetDisplay'
import { useNavigate } from 'react-router-dom'
import { Sippet } from './Sippet'

export const SippetsFeed = ({ sippets }) => {

  const navigate = useNavigate()

  return (
    <section className='w-full border-b border-b-slate-600'>
        {sippets.length > 0 ? sippets.map((sippet, i) => (
            <article onClick={() => {navigate(`/sippet/${sippet._id}`)}} key={i}
            className='w-full cursor-pointer relative after:hidden after:bg-slate-500 after:absolute after:w-[1px] after:left-1 after:top-1/2 after:-translate-y-1/2 after:bottom-0 after:h-[94%] after:'>
            <div className='duration-300 hover:bg-[#000015] hover:bg-opacity-30'>
                {/* {sippet.is == 'comment' && sippet.ref_sippet.blocks && <SippetDisplay sippet={sippet.ref_sippet} />}
                <SippetDisplay sippet={sippet} /> */}
                {/* {console.log(sippet)} */}
                <Sippet sippet={sippet} />
              {sippet.is != 'comment' && <button className='opacity-0 hover:opacity-100 duration-1000 text-neutral-500 w-full text-center text-sm p-1'>
              open thread
            </button>}
            </div>
          </article>
        ))
        :
        <h1 className='w-full text-center p-8 text-2xl border-t border-slate-600'>Nothing here yet</h1>
    }
    </section>
  )
}
