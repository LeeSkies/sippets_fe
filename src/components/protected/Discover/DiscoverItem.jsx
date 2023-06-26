import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DiscoverItem = ({ user }) => {

    const navigate = useNavigate()

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

  return (
    <button onClick={() => navigate('/user/' + user._id)} className='flex items-center w-full space-x-4 text-slate-800 border border-slate-800 rounded p-1'>
        <article>
            {user?.image?.secure_url? <img src={user.image.secure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')}
            alt={<p
            style={{backgroundColor: randomColor}} className="font-bold w-10 h-10 text-center flex items-center justify-center">
                  {user.username.charAt(0).toUpperCase()}
                </p>} className='w-10 rounded aspect-square' />
                :
                <p style={{backgroundColor: randomColor}} className="font-bold w-10 h-10 text-center flex items-center justify-center">
                  {user.username.charAt(0).toUpperCase()}
                </p>}
        </article>
        <p className='text-xl'>{user.username}</p>
    </button>
  )
}
