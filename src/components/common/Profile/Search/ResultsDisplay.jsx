import React from 'react'
import { TextResult } from './TextResult'

export const ResultsDisplay = ({ results }) => {
  return (
    <section className='absolute bot-0 w-full z-20 bg-slate-100 text-slate-900'>
        {results.map((result, i) => <TextResult result={result} />)}
    </section>
  )
}
