import React, { useState } from 'react'
import { SearchBar } from './SearchBar'

export const Search = () => {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
  return (
    <div className='w-full py-2'>
        <SearchBar />
    </div>
  )
}
