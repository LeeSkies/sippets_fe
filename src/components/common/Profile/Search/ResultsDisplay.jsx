import React from 'react'
import { TextResult } from './TextResult'

export const ResultsDisplay = ({ results }) => {
  return (
    <section className='absolute bot-0 w-full h-24 z-20 bg-slate-100'>
        {results.map((result, i) => <TextResult result={result} />)}
    </section>
  )
}
