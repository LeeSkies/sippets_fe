import CodeMirror from '@uiw/react-codemirror'
import React, { useContext, useEffect, useState } from 'react'
import { langs } from '../utilities/Langs'
import { SippetDisplayHeader } from './SippetDisplayHeader'
import { SippetDisplayFooter } from './SippetDisplayFooter'
import TextareaAutosize from 'react-textarea-autosize';
import { SippetSkeleton } from '../utilities/SippetSkeleton'
import { useParams } from 'react-router-dom'
import * as themes from '@uiw/codemirror-themes-all'
import { UserContext } from '../../context/userContext'
import { ImageModal } from '../common/ImageModal'

export const SippetDisplay = ({ sippet }) => {

  const { user } = useContext(UserContext)

  const [code, setCode] = useState({ blocks: [], lang: null })
  const [modal, setModal] = useState(false)

  const { id } = useParams()

  const handleWheel = (e) => {
    const container = e.currentTarget;
    container.scrollLeft += e.deltaY/4;
    e.stopPropagation()
  };

  useEffect(() => {
    const defCodeSrc = () => {
      if (sippet.is == 'toast') {
        setCode({blocks: sippet.ref_sippet.blocks, lang: sippet.ref_sippet.language})
        return
      }
      setCode({blocks: sippet.blocks, lang: sippet.language})
    }
    defCodeSrc()
  }, [])

  return (
   sippet != undefined ?
    <article className={`p-2 flex flex-col ${sippet.is == 'comment' && !id ? '' : 'border-t'} ${sippet.is == 'comment' ? 'relative after:bg-slate-500 after:absolute after:w-[1px] after:left-0 after:bottom-4 after:hidden after:h-[94%]' : ''} border-t-slate-600 bg-transparent relative`}>
      <section className='w-full flex flex-col'>
        {<SippetDisplayHeader sippet={sippet.is == 'toast' ? sippet.ref_sippet : sippet} toastAuthor={sippet.is == 'toast' && sippet.author} />}
        <article onWheel={handleWheel} className={`container flex w-full justify-center flex-col items-center p-1 bg-neutral800`}>
          {code.blocks && code.blocks.map((block, i) => (
            block.type === 'text' ?
            <TextareaAutosize
              key={i}
              readOnly={true}
              value={block.value}
              className='w-full resize-none caret-white bg-transparent whitespace-pre-wrap overflow-hidden active:outline-none focus:outline-none px-1 text-xl'
            />
            :
            <div key={i} onWheel={handleWheel}
            className='flex overflow-x-scroll w-full text-sm custom-scrollbar'>
            <CodeMirror
              value={block.value}
              readOnly={true}
              theme={themes[user?.theme] || themes.tokyoNight}
              extensions={[langs.get(code.lang)]}
            />
          </div>
          ))}
          </article>
          {sippet.file &&
          <div className='rounded-xl aspect-square m-3 md:m-6 overflow-clip mt-3'>
            <img loading='lazy' onClick={(e) => {e.stopPropagation(), setModal(prev => !prev)}}
            src={sippet.file} className='w-full' />
          </div>}
          {modal && <ImageModal cb={setModal} url={sippet.is == 'toast' ? sippet.ref_sippet.file : sippet.file} />}
        <SippetDisplayFooter sippet={sippet} />
      </section>
    </article>
    :
    <SippetSkeleton />
  )
}
