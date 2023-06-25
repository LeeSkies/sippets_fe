import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const ConfirmModal = ({ text, onAction, onClose }) => {
  return (
    <div onClick={onClose} className='fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-30 h-screen w-screen'>
        <section className='p-6 bg-slate-800 shadow-2xl border-slate-400 rounded-lg space-y-6 max-w-[500px]'>
            <p className='text-xl'>{text}</p>
            <article className='flex text-slate-900 items-center space-x-3'>
                <div onClick={onAction}
                className='cursor-pointer w-[80px] bg-lime-600 flex justify-center p-2 rounded duration-300 hover:opacity-90 active:scale-90'>
                    <CheckIcon className='w-6 h-6' />
                </div>
                <div onClick={onClose}
                className='cursor-pointer w-[80px] bg-rose-600 flex justify-center p-2 rounded duration-300 hover:opacity-90 active:scale-90'>
                    <XMarkIcon className='w-6 h-6' />
                </div>
            </article>
        </section>
    </div>
  )
}
