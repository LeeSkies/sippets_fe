import React from 'react'
import { ImageComp } from '../../common/ImageComp'

export const UserHeader = ({ result }) => {
  return (
    <header className='flex items-center space-x-2'>
        {result.author?.image?.secure_url ? <ImageComp url={result.author.image.secure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')} w={'40px'} h={'40px'} />
        : <p className='rounded w-[40px] flex items-center justify-center h-[40px] bg-blue-600'>{result.author.username.charAt(0)}</p>}
        <p>{result.author.username}</p>
    </header>
  )
}
