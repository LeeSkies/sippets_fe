import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { Title } from '../common/Title'
import { SippetsFeed } from '../sippets/SippetsFeed'
import instance from '../../services/axios'
import { SippetSkeleton } from '../utilities/SippetSkeleton'

export const Liked = () => {

  const { loggedIn } = useContext(UserContext)

  const navigate = useNavigate()

  const [sippets, setSippets] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLikedSippets = async (offset = 0) => {
      try {
        const { data } = await instance.get(`/protected/sippet/liked?offset=${offset}`, {
          withCredentials: true,
        });
        setSippets(data);
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    };
    fetchLikedSippets(page)
  }, [])

  return (
    <div className='w-full pb-20 min-h-screen'>
      <Title title={'Liked'} />
      {loading ? Array(5).fill(null).map((_, i) =>
      <div key={i} className='w-full'>
        <SippetSkeleton icon={true} />
      </div>)
      : <SippetsFeed sippets={sippets} />}
    </div>
  )
}
