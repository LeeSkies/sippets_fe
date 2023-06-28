import { Result } from 'postcss'
import React from 'react'

export const ResultsDisplay = ({ results }) => {
  return (
    <section className='absolute bot-0 w-full h-24 z-20'>
        {results.map((result, i) => <Result />)}
    </section>
  )
}
