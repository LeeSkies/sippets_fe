import React, { useContext, useEffect, useState } from 'react'
import { SippetDisplay } from '../sippets/SippetDisplay'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { SippetEditor } from '../sippets/SippetEditor'
import { UserContext } from '../../context/userContext'
import { Title } from '../common/Title'
import { CommentContext } from '../../context/commentContext'
import { SippetsFeed } from '../sippets/SippetsFeed'
import { Sippet } from '../sippets/Sippet'
import { ImageComp } from '../common/ImageComp'
import instance from '../../services/axios'
import { SippetSkeleton } from '../utilities/SippetSkeleton'

export const UserSippetPage = () => {

    const { id } = useParams()

    const [sippet, setSippet] = useState()
    const [loading, setLoading] = useState(true)

    const { loggedIn, user } = useContext(UserContext)

    const { setCommentingOn } = useContext(CommentContext)

    const getRandomColor = () => {
      const midRangeColors = [
        '#89CFF0',
        '#0000FF',
        '#7393B3',
        '#088F8F',
        '#0096FF',
        '#0047AB',
        '#6495ED',
        '#1434A4',
        '#1F51FF',
        '#4169E1',
        '#4682B4',
      ];
    
      const randomIndex = Math.floor(Math.random() * midRangeColors.length);
      return midRangeColors[randomIndex];
    };

    const randomColor = getRandomColor()

    const navigate = useNavigate()

    const handleClick = (e, cb) => {
      e.stopPropagation()
      cb()
    }

    useEffect(() => {
      setSippet(null)
      setCommentingOn(id)
      const getSippet = async () => {
        const { data } = await instance.get(`/protected/sippet/single/${id}`,{ withCredentials: true })
        setSippet(data)
        setLoading(false)
      }
      getSippet()
    }, [id])

  return (
    loading ? <SippetSkeleton count={5} icon={true} /> : 
    sippet ?
    <div className='w-full min-h-screen'>
      <Title title={'Sippet'} />
        <Sippet sippet={sippet} />
        {console.log(sippet)}
        {loggedIn && <article className='w-full flex justify-between p-2 items-center'>
        <button
            onClick={(e) =>
              handleClick(e, () => navigate(`/user/${user._id}`))
            }
            style={{
              backgroundColor: "#6699FF",
            }}
            className={
              "h-10 w-10 md:h-14 ml-auto md:w-14 rounded overflow-clip flex items-center justify-center"
            }
          >
            {user?.image?.secure_url ?
            <ImageComp url={user.image.secure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')} /> : 
            <p className="font-bold ">
              {user.username.charAt(0).toUpperCase()}
            </p>}
          </button>
        </article>}
        {loggedIn && <SippetEditor op='comment' />}
        <section className=''>
          <SippetsFeed sippets={sippet.comments} />
        </section>
    </div> :
    <div className='w-full'>
      <Title title={'Sippet'} />
      <h1 className='w-full text-center p-2'>A problem occurred, please try again later</h1>
    </div>
  )
}
