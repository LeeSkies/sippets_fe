import EmojiPicker from '@emoji-mart/react'
import { CodeBracketIcon, FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {  PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React, { useContext, useRef, useState } from 'react'
import data from '@emoji-mart/data'
import { LangSelector } from '../utilities/Langs'
import { SippetsContext } from '../../context/sippetsContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export const SippetEditorFooter = ({ op, blocks, setBlocks, setError, addCodeBlock, lang, setLang, emojiPicker, handleEmojiPick, handleEmojiPickerOpen, maxCodeLength = 600 }) => {

  const { sendSippet } = useContext(SippetsContext)

  const { id } = useParams()

  const fileRef = useRef()

  const navigate = useNavigate()

  const [filesHovered, setFilesHovered] = useState(false)
  const [files, setFiles] = useState(0)
  const [loading, setLoading] = useState(false)

  const getCodeLength = () => {
    let len = 0
    for (const block of blocks) {
      len += block.value.length
    }
    return len
  }

  const handleFileChange = () => {
    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedFormats.includes(fileRef.current.files[0].type)) {
      toast.warning('Only formats of (jpeg, png, gif) are allowed')
      fileRef.current.files = new DataTransfer().files
      return
    }

    if (fileRef.current.files[0].size > 5000000) {
      toast.warning('File size too large (max : 3mb)')
      fileRef.current.files = new DataTransfer().files
      return
    }
    setFiles(fileRef.current.files.length)
  }

  const handleFileRemoval = (index) => {
    const dt = new DataTransfer();
    const { files } = fileRef.current;
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i)
        dt.items.add(file)
    }
  
    fileRef.current.files = dt.files;
  }

  const handleClick = async () => {
    setLoading(true);
    if (op == 'sippet') {
      const sippet_id = await sendSippet(blocks, lang, [], setError, fileRef.current.files[0])
      setBlocks([{ type: "text", value: "" }])
      setError('')
      if (sippet_id) navigate('/sippet/' + sippet_id)
    }
    else {
      const sippet_id = await sendSippet(blocks, lang, [], setError, fileRef.current.files[0], id)
      setBlocks([{ type: "text", value: "" }])
      setError('')
      if (sippet_id) navigate('/sippet/' + sippet_id)
    }
    fileRef.current.files = new DataTransfer().files
    setLoading(false);
  }

    return (
      <section className='w-full'>
        <section className='flex w-full justify-between items-center'>
          <div className='flex p-1 space-x-3 relative items-center'>
            <button className='pr-2' onClick={handleEmojiPickerOpen}>
              <FaceSmileIcon className="h-6 w-6"/>
            </button>
            {emojiPicker &&
                <figure className='absolute z-10 top-12 left-0'>
                  <EmojiPicker
                    data={data}
                    onEmojiSelect={(e) => {handleEmojiPick(e)}} />
                </figure>}
            <button onClick={addCodeBlock} className='p-2'>
              <CodeBracketIcon className="h-6 w-6"/>
            </button>
            <div className="p-2 relative cursor-pointer">
              <label htmlFor="file-input">
                <PhotoIcon className="h-6 w-6 cursor-pointer" />
              </label>
              <input onChange={handleFileChange} ref={fileRef} id="file-input" type="file" className="hidden" />
            </div>
            {fileRef?.current?.files.length > 0 && <div className='relative'>
              <section className='' onPointerEnter={() => setFilesHovered(true)} onPointerLeave={() => setFilesHovered(false)}>
                <p className='animate-pulse text-sky-500'>Files</p>
                {filesHovered && <article className='absolute min-w-max bg-neutral-950 z-20 p-1 space-y-1'>
                  {Array.from(fileRef.current.files).map((file, i) =>
                    (<div key={i} className='flex items-center'>
                      <button onClick={() => handleFileRemoval(i)} className='p-1'>
                        <XMarkIcon className='w-3 h-3' />
                      </button>
                      <p>{file.name}</p>
                      <img src={URL.createObjectURL(file)} className='w-[400px] pl-4' alt="" />
                    </div>
                  ))}
                </article>}
              </section>
            </div>}
          </div>
          <div className='flex items-center'>
            <LangSelector cb={setLang} />
            <p className={`text-lg px-2 pl-3 font-semibold ${getCodeLength() > maxCodeLength - 50 ? 'text-red-400' : getCodeLength() > maxCodeLength - 100 ? 'text-yellow-400' : 'text-green-400'}`}>
              {maxCodeLength - getCodeLength()}
            </p>
            <button onClick={handleClick} className='p-2 hover:text-rose-500 active:scale-95 duration-300'>
              {loading ? <div className='rounded-full h-3 w-3 border border-b-sky-400 animate-spin'></div>
              : <PaperAirplaneIcon className='h-6 w-6 hover:text-sky-400' />}
            </button>
          </div>
        </section>
      </section>
  )
}
