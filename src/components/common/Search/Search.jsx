import React, { useState } from 'react'
import { SearchBar } from './SearchBar'
import { ResultsDisplay } from './ResultsDisplay'

export const Search = () => {
    const [results, setResults] = useState([])
    const [param, setParam] = useState('text')

  return (
    <div className='w-full relative py-2 border-t border-t-slate-600'>
        <SearchBar param={param} setParam={setParam} results={results} setResults={setResults} />
        <ResultsDisplay param={param} results={results}  />
    </div>
  )
}
