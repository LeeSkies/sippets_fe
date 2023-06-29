import React from 'react'
import { TextResult } from './TextResult'
import { UserResult } from './UserResult'

export const ResultsDisplay = ({ param, results }) => {
  // console.log(results);
  return (
    <section className='absolute bot-0 w-full z-20 bg-neutral-500 text-slate-900'>
        {results.map((result, i) => param == 'text' ? <TextResult result={result} /> : <UserResult result={result} />)}
    </section>
  )
}
