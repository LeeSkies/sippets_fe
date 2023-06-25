import React from 'react'
import { SettingsBanner } from './SettingsBanner'
import CodeMirror from '@uiw/react-codemirror'
import { langs } from '../../utilities/Langs'
import * as themes from '@uiw/codemirror-themes-all'
import { Checkbox } from '../../utilities/Checkbox'

export const CodeThemeSettings = ({ edit, setEdit, open, handleClick }) => {

  const defaultString = `function factorial(n) {
      if (n <= 1) {
        return 1;
      } else {
        return n * factorial(n - 1);
      }
    }
    
    result = factorial(5);
    }`

  const handleThemeClick = (value) => {
      setEdit(prev => {return {...prev, theme: value}})
  }

  return (
    <div className='w-full'>
        <SettingsBanner open={open} onClick={() => handleClick('Code Theme')} text={'Code Theme'} />
        {open.includes('Code Theme') && <article className='w-full px-2 space-y-2 overflow-hidden duration-300'>
        <div className='flex overflow-x-scroll w-full border bg-neutral-900 my-2 text-sm custom-scrollbar rounded p-1'>
            <CodeMirror
              value={defaultString}
              theme={themes[edit?.theme] || themes.tokyoNight}
              extensions={[langs.get('javascript')]}
            />
          </div>
          <div className='w-full space-y-2 max-h-[400px] custom-scrollbar overflow-y-scroll border-b border-b-slate-600'>
            {Object.entries(themes).map((theme, i) => {if (!theme[0].includes('Init') && !theme[0].includes('Settings')) return (
              <button key={i} onClick={() => handleThemeClick(theme[0])}
              className={`w-full p-4 border bg-neutral-900 bg-opacity-40 rounded-xl flex items-center justify-between ${edit?.theme == theme[0] ? 'border-green-400' : 'border-slate-800'}`}>
                <p>{theme[0]}</p>
                <Checkbox checked={edit?.theme == theme[0]} />
              </button>
            )})}
          </div>
        </article>}
    </div>
  )
}
