import React from 'react'

export const SippetSkeleton = ({ count = 4, w, h, icon }) => {
  return (
    <div className="w-full flex flex-col [&_*]:bg-opacity-70 rounded p-4 space-y-4 [&_*]:animate-pulse">
        {icon && <div className="h-16 w-16 bg-gray-300 self-end rounded-md "></div>}
        {new Array(count).fill(null).map((row, i) => (
          <div key={i} style={{
            height: `${h ? h : '1rem'}`,
            width: `${w ? w : Math.random() * (100-65) + 65}%`
          }} className="bg-gray-300 rounded"></div>  
        ))}
    </div>

  )
}
