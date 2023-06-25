import React, { useRef, useState } from 'react'
import { SettingsBanner } from './SettingsBanner'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'

export const PicSettings = ({ edit, setEdit, open, handleClick, user }) => {

    const fileRef = useRef()

    const handleChange = () => {
      const allowedFormats = ["image/jpeg", "image/png"];

      if (!allowedFormats.includes(fileRef.current.files[0].type)) {
        toast.warning('Only formats of (jpeg, png, gif) are allowed')
        fileRef.current.files = new DataTransfer().files
        return
      }

      if (fileRef.current.files[0].size > 3000000) {
          toast.warning('File size too large (max : 3mb)')
          return
      }

      setEdit({...edit, image: fileRef.current.files[0]})
    }

  return (
    <section className='w-full space-y-8'>
        <SettingsBanner open={open} onClick={() => handleClick('Image')} text={'Image'} />
        {open.includes('Image') &&
        <div className='flex flex-col items-center space-y-8'>
            <div className={`container aspect-square relative w-[90%] rounded-md backdrop-blur-sm m-auto overflow-clip flex items-center justify-center ${edit.image ? '' : 'border border-slate-600'}`}>
                {edit.image && edit.image != 'noimage' && <img src={fileRef.current && fileRef.current.files.length > 0 ? URL.createObjectURL(fileRef.current.files[0]) : edit.image} alt=""
                className='absolute inset-0 z-10 object-cover min-w-full min-h-full' />}
                <div className="p-2 relative cursor-pointer">
                  <label htmlFor="file-input">
                    <PhotoIcon className="h-6 w-6 cursor-pointer" />
                  </label>
                  <input ref={fileRef} onChange={handleChange} id="file-input" type="file" className="hidden" />
                </div>
            </div>
            <footer className='space-x-2 flex'>
                <button onClick={() => {
                    setEdit({ ...edit, image: user?.image ? user.image : null })
                    fileRef.current.files = new DataTransfer().files
                    }} className='p-1 px-2 bg-green-700 rounded-sm w-[80px]'>reset</button>
                <button onClick={() => {
                    setEdit({ ...edit, image: 'noimage' })
                    fileRef.current.files = new DataTransfer().files
                    }} className='p-1 px-2 bg-slate-600 rounded-sm w-[80px]'>remove</button>
            </footer>
        </div>}
    </section>
  )
}
