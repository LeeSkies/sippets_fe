import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const Modal = ({ children, label = 'close', cb = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='animations'>
      <button
        className="bg-slate-700 md:bg-slate-200  md:text-slate-700 active:scale-95 duration-200 font-bold text-lg min-w-[90px] w-full py-1 md:py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        {label}
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative bg-neutral-800 p-6 rounded-lg border max-sm:w-[95%] border-neutral-800 focus-within:border-slate-500 duration-700 w-full z-20 max-w-md">
            {children}
            <button
              className="absolute active:scale-90 left-0 right-0  bg-slate-800 text-white w-10 h-10 -bottom-14 mx-auto rounded-full mt-4"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className='h-5 w-5 mx-auto' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
