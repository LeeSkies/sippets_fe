import React from 'react'
import { TextResult } from './TextResult'
import { UserResult } from './UserResult'

export const ResultsDisplay = ({ param, results }) => {
  return (
    <section className='absolute bot-0 w-full z-20 bg-gradient-to-r from-sky-200 shadow to-neutral-600 text-slate-600'>
        {results.map((result, i) => param == 'text' ? <TextResult  <UserResult />)}
    </section>
  )
}
