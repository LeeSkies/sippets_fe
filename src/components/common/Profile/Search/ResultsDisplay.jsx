import React from 'react'
import { TextResult } from './TextResult'

export const ResultsDisplay = ({ results }) => {
  return (
    <section className='absolute bot-0 w-full z-20 bg-gradient-to-r from-sky-200 shadow to-neutral-900 text-slate-600'>
        {results.map((result, i) => <TextResult result={result} />)}
    </section>
  )
}
