import React, { useContext, useEffect, useState } from 'react'
import { SippetEditor } from '../sippets/SippetEditor'
import { Title } from '../common/Title'
import { SippetSkeleton } from '../utilities/SippetSkeleton'
import { SippetsFeed } from '../sippets/SippetsFeed'
import { SippetsContext } from '../../context/sippetsContext'

export const UserHome = () => {

  const { latestSippets, followingSippets, fetchLatestSippets, fetchFollowingSippets} = useContext(SippetsContext)

  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState('latest')
  const [sippets, setSippets] = useState([])
  const [page, setPage] = useState(0)

  const changeDisplay = async (type) => {
    if (type == 'latest') {
      setSippets(latestSippets)
    }
    else if (type == 'following') {
      if (followingSippets.length <= 0)
        fetchFollowingSippets(setLoading, setSippets)
      else
        setSippets(followingSippets)
    }
    setDisplay(type)
  }

  useEffect(() => {
      if (display == 'latest' && page != 0 || latestSippets.length <= 0) {
        setLoading(true)  
        fetchLatestSippets(setLoading, setSippets)
      }
      else if (page != 0) {
        setLoading(true)
        fetchFollowingSippets(setLoading, setSippets)
      }
      else if(page == 0)
        setSippets(latestSippets)
  }, [page]);

  return (
    <div className='flex flex-col items-center w-full pb-20 min-h-screen'>
      <Title title={'Home'} />
      <SippetEditor />
      <nav className='border-t border-t-slate-600 flex w-full'>
        <button onClick={() => changeDisplay('latest')} className={`text-xl grow p-4 md:p-8 ${display == 'latest' && 'border-b box-border'}`}>Latest</button>
        <button onClick={() => changeDisplay('following')} className={`text-xl grow p-4 md:p-8 ${display == 'following' && 'border-b box-border'}`}>Following</button>
      </nav>
      {/* <SippetsFeed sippets={display == 'latest' ? latestSippets : followingSippets} /> */}
      {sippets.length > 0 && <SippetsFeed sippets={sippets} />}
      {loading && new Array(5).fill(null).map((_ , i) => (
            <div key={i} className='w-full'>
              <SippetSkeleton icon={true} />
            </div>))}
      {sippets.length > 0 ? (!loading && sippets.length % 10 == 0 && <button onClick={() => setPage(page + 1)}
        className='w-full p-2 hover:bg-slate-800 duration-300'>
          load more
      </button>)
      :
      <h1 className='p-4 text-xl'>No sippets here yet.</h1>}
    </div>
  )
}
