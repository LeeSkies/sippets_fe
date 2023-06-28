import React from 'react'
import { ImageComp } from '../../ImageComp'
import { useNavigate } from 'react-router-dom'

export const TextResult = ({ result }) => {

    const navigate = useNavigate()

    const buildStr = (maxLen) => {
        let sb = ''
        result.blocks.map(b => {
            if (sb.length > maxLen) return
            const len = maxLen - sb.length
            sb = sb + b.value.substring(0, len)
        })
        return sb
    }

  return (
    <button onClick={() => navigate('/sippet/' + result._id)} className='w-full p-2 hover:bg-sky-200 duration-200'>
        <header className='flex items-center space-x-2'>
            {result.author?.image?.secure_url ? <ImageComp url={result.author.image.secure_url.replace('upload/', 'upload/c_fill,h_200,w_200/')} w={'40px'} h={'40px'} />
            : <p className='rounded w-[40px] flex items-center justify-center h-[40px] bg-blue-600'>{result.author.username.charAt(0)}</p>}
            <p>{result.author.username}</p>
        </header>
        <p>{buildStr(50)}...</p>
        <footer>Footer</footer>
    </button>
  )
}

