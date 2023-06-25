import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ToastHeader = ({ author }) => {
  
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
    <figure onClick={(e) => handleClick(e, () => navigate(`/user/${i}/${author._id}`))} style={{
      backgroundColor: '#6699FF'
    }} className={'h-10 w-10 md:h-14 md:w-14 rounded flex items-center cursor-pointer justify-center'}>
        <p className='font-bold '>{author.username.charAt(0).toUpperCase()}</p>
    </figure>
  )
}
