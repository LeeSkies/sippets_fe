import React from 'react'
import { SippetDisplay } from './SippetDisplay'

export const Sippet = ({ sippet }) => {
  return (
    <section className='w-full'>
        {sippet.is == 'comment' && sippet.ref_sippet.blocks && <SippetDisplay sippet={sippet.ref_sippet} />}
        <div className={`${sippet.is == 'comment' ? 'm-2' : ''}`}>
            <SippetDisplay sippet={sippet} />
        </div>
    </section>
  )
}
