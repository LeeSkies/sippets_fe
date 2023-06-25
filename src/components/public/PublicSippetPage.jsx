import React, { useEffect, useState } from 'react'
import { SippetDisplay } from '../sippets/SippetDisplay'
import { useParams } from 'react-router-dom'
import { Title } from '../common/Title'
import { SippetsFeed } from '../sippets/SippetsFeed'
import instance from '../../services/axios'

export const PublicSippetPage = () => {

    const { id } = useParams()

    const [sippet, setSippet] = useState()

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

    useEffect(() => {
      setSippet(null)
      const getSippet = async () => {
        const { data } = await instance.get(`/public/sippet/single/${id}`)
        setSippet(data)
      }
      getSippet()
    }, [id])

  return (
    sippet && <div className='w-full min-h-screen'>
      <Title title={'Sippet'} />
        <SippetDisplay sippet={sippet} />
        <section className='border-t-4 border-t-slate-600'>
          <SippetsFeed sippets={sippet.comments} />
        </section>
    </div>
  )
}
