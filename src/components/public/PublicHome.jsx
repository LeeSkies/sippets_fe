import React, { useEffect, useState } from 'react'
import { SippetDisplay } from '../sippets/SippetDisplay'
import { useNavigate } from 'react-router-dom'
import { Title } from '../common/Title'
import axios from 'axios'
import { SippetSkeleton } from '../utilities/SippetSkeleton'
import { SippetsFeed } from '../sippets/SippetsFeed'

export const PublicHome = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [sippets, setSippets] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchSippets = async (offset = 0) => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_URL + `/public/sippet/latest?offset=${offset}`, {
          withCredentials: true,
        });
        setSippets([...sippets, ...data]);
        // data.map(s => s.blocks.map(b => console.log(b.value)))
      } catch (error) {
        alert(error.message);
      }
    };
    fetchSippets(page)
    setLoading(false);
  }, [page])

  return (
    <div className='flex flex-col items-center justify-center w-full pb-20'>
      <Title title={'Home'} />
      <h1 className='w-fill text-center p-4 font-sans italic font-extralight'>Sign in and start sharing your ideas!</h1>
      {!loading && sippets.length > 0 && <SippetsFeed sippets={sippets} />}
      {loading && new Array(5).fill(null).map((_ , i) => (
        <div key={i} className='w-full'>
          <SippetSkeleton />
        </div>))}
        {sippets.length > 0 && sippets.length % 10 != 0 && <button onClick={() => setPage(prev => prev + 1)}
        className='w-full p-2 hover:bg-slate-800 duration-300'>
          load more
        </button>}
    </div>
  )
}
