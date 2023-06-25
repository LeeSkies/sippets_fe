import React, { useContext, useEffect, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '../utilities/Langs';
import { SippetEditorFooter } from './SippetEditorFooter';
import TextareaAutosize from 'react-textarea-autosize';
import * as themes from '@uiw/codemirror-themes-all'
import { UserContext } from '../../context/userContext';

export const SippetEditor = ({ op = 'sippet', maxCodeLength = 600 }) => {

    const { user } = useContext(UserContext)

    const [code, setCode] = useState('')
    const [emojiPicker, setEmojiPicker] = useState(false)
    const [veil, setVeil] = useState(false)
    const [lang, setLang] = useState('C-like')
    const [error, setError] = useState('')
    const [blocks, setBlocks] = useState([{type: 'text', value:''}])
    const [focused, setFocused] = useState()

    const blockRef = useRef()

    const handleEmojiPickerOpen = () => {
      setEmojiPicker(!emojiPicker)
      setVeil(!veil)
    }

    const handleEmojiPick = (e) => {
      const newBlocks = blocks.map((block, i) => {
        if (i === focused) return {...block, value: block.value + e.native}
        return block
      })
      setBlocks([...newBlocks])
    }

    const handleKeyDown = (e, index) => {
      if (e.code === 'Backspace' && !blocks[index].value)
      if (index !== 0 && index !== blocks.length - 1)
        if (index == blocks.length - 2 && !blocks[index + 1].value)
          setBlocks(prev => prev.filter((block, i) => i < blocks.length - 2 ))
        else
          setBlocks(prev => prev.filter((block, i) => i !== index))
      else if (index === 1 && blocks.length === 2)
        setBlocks(prev => prev.filter((block, i) => i !== index))
    }

    const handleWheel = (e) => {
      const container = e.currentTarget;
      container.scrollLeft += e.deltaY/4;
      e.stopPropagation()
    };

    const addCodeBlock = () => {
      const lastIndex = blocks.length - 1;
      const lastBlock = blocks[lastIndex];
    
      if (lastBlock.type === "code" && lastBlock.value === "") {
        return; // Do not add a new code block if the last block is an empty code block
      }
    
      if (lastBlock.type === "text" && lastIndex !== 0 && lastBlock.value === "") {
        if (blocks[blocks.length -2].type === 'code' && blocks[blocks.length - 2].value !== '') {
          setBlocks([
            ...blocks.slice(0, lastIndex),
            { type: "code", value: "" },
          ]);
        }
      } else {
        // Add a new code block and ensure the last block is always a text block
        setBlocks([
          ...blocks,
          { type: "code", value: "" },
          { type: "text", value: "" },
        ]);
      }
    };

    const handleChange = (value, i) => {
      const newBlocks = blocks.map((block, i) => {
        if (i === focused) return {...block, value:value}
        return block
      })
      setBlocks([...newBlocks])
    }

    useEffect(() => {
      if (code.length > maxCodeLength) {
        setCode(prev => prev.substring(0, maxCodeLength))
      }
    }, [code])

  return (
    <div className='flex justify-center w-full flex-col p-1'>
      {veil && <div onClick={() => {
        setEmojiPicker(false);
        setVeil(false);
      }} className='bg-transparent absolute inset-0 z-10 w-full'></div>}
      <section className='flex flex-col w-full p-1 container justify-center items-center'>
        <article className='container flex w-full justify-center flex-col items-center p-1 bg-neutral800'>
          {blocks.map((block, i) => (
            block.type === 'text' ?
            <TextareaAutosize
              key={i}
              ref={blockRef}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              value={block.value}
              onFocus={() => setFocused(i)}
              autoFocus={i === blocks.length - 1 || blocks.length === 1}
              placeholder={i === 0 ? op == 'sippet' ? "what's on your mind?" : 'write your comment' : ''}
              className='w-full caret-white bg-transparent whitespace-pre-wrap overflow-hidden active:outline-none focus:outline-none px-1 text-xl resize-none'
            />
            :
            <div key={i} onWheel={handleWheel}
            className='flex overflow-x-scroll w-full text-sm custom-scrollbar'>
            <CodeMirror
              ref={blockRef}
              value={block.value}
              theme={themes[user.codeTheme] || themes.tokyoNight}
              placeholder={'//'}
              onChange={(value) => handleChange(value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onFocus={() => setFocused(i)}
              autoFocus={i === blocks.length - 1 || i === blocks.length - 2}
              extensions={[langs.get(lang)]}
            />
          </div>
          ))}
          </article>
          {error && <p className='text-rose-500 pt-1 self-start'>{error}</p>}
        </section>
        <SippetEditorFooter op={op} blocks={blocks} setBlocks={setBlocks} addCodeBlock={addCodeBlock} setError={setError} lang={lang} setLang={setLang} emojiPicker={emojiPicker} handleEmojiPick={handleEmojiPick} handleEmojiPickerOpen={handleEmojiPickerOpen} />
    </div>
  )
}
