import React, { useState } from 'react'
import { SearchBar } from './SearchBar'
import { ResultsDisplay } from './ResultsDisplay'

export const Search = () => {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
  return (
    <div className='w-full relative py-2 border-t border-t-slate-600'>
        <SearchBar />
        <ResultsDisplay />
    </div>
  )
}
