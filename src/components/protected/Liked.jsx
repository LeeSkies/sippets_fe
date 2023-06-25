import React, { useContext, useEffect, useState } from 'react'
import { SippetEditor } from '../sippets/SippetEditor'
import { SippetDisplay } from '../sippets/SippetDisplay'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext'
import { Title } from '../common/Title'
import { SippetsFeed } from '../sippets/SippetsFeed'

export const Liked = () => {

  const { loggedIn } = useContext(UserContext)

  const navigate = useNavigate()

  const [sippets, setSippets] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchLikedSippets = async (offset = 0) => {
      try {
        const { data } = await axios.get('https://real-clam-loafers.cyclic.app' + `/protected/sippet/liked?offset=${offset}`, {
          withCredentials: true,
        });
        setSippets(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchLikedSippets(page)
  }, [])

  return (
    <div className='w-full pb-20 min-h-screen'>
      <Title title={'Liked'} />
      <SippetsFeed sippets={sippets} />
    </div>
  )
}
