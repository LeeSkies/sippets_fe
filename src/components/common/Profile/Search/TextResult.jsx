import React from 'react'
import { ImageComp } from '../../ImageComp'

export const TextResult = ({ result }) => {

    const buildStr = (maxLen) => {
        let sb
        result.blocks.map(b => {
            if (sb.length > len) return
            const len = maxLen - sb.length
            sb = sb + b.value.substring(0, len)
        })
        return sb
    }

  return (
    <article className='w-full hover:bg-slate-300 duration-200'>
        <header className='flex'>
            {result.author?.file?.secure_url ? <ImageComp url={result.author.file.secure_url} w={'20px'} h={'20px'} />
            : <p className='rounded bg-blue-600'>{result.author.username.charAt(0)}</p>}
            <p>{result.author.username}</p>
        </header>
        <p>{buildStr}</p>
        <footer>Footer</footer>
    </article>
  )
}

