'use client'

import { LoadingAtom } from '@/atoms/Loading'
import { ModeAtom } from '@/atoms/Mode'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { IoDocumentsOutline } from 'react-icons/io5'
import { AiOutlineCheck } from 'react-icons/ai'
import { BsPalette2 } from 'react-icons/bs'

export const Header = () => {
  const [mode, setMode] = useRecoilState(ModeAtom)
  const loading = useRecoilValue(LoadingAtom)
  const listTheme = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ]

  const themeList = () => {
    return (
      <ul
        tabIndex={0}
        className='dropdown-content menu rounded-box h-[70vh] max-h-96 w-fit flex-nowrap overflow-y-auto bg-base-300 p-2 shadow'
      >
        {listTheme.map((theme, index) => (
          <li key={index} data-theme={theme} className='my-1 bg-transparent'>
            <button
              className='flex justify-between rounded-lg bg-base-100'
              data-set-theme={theme}
              data-act-class='[&_svg]:visible'
            >
              <AiOutlineCheck className='check invisible' />
              {theme.toUpperCase()}
              <div className='flex gap-1'>
                <span className='inline-block h-5 w-3 rounded-full bg-primary'></span>
                <span className='inline-block h-5 w-3 rounded-full bg-secondary'></span>
                <span className='inline-block h-5 w-3 rounded-full bg-success'></span>
                <span className='inline-block h-5 w-3 rounded-full bg-neutral'></span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className='bg-base-200 p-3 flex items-center justify-between'>
      <h1 className='font-bold text-lg'>
        {"Maaaashi's ChatGPT Cooking Assistant"}
      </h1>
      <div className='hidden md:flex'>
        <button
          className={`btn ${mode === 'generate' ? 'btn-active' : ''}`}
          onClick={() => setMode('generate')}
          disabled={loading}
        >
          レシピ作成
        </button>
        <button
          className={`btn ${mode === 'list' ? 'btn-active' : ''}`}
          onClick={() => setMode('list')}
          disabled={loading}
        >
          一覧
        </button>
        <div className='dropdown-end dropdown'>
          <label tabIndex={0} className='btn flex-col justify-around'>
            <BsPalette2 size='15px' />
          </label>
          {themeList()}
        </div>
      </div>
      <div className='md:hidden flex'>
        <button
          className={`btn text-lg ${mode === 'generate' ? 'btn-active' : ''}`}
          onClick={() => setMode('generate')}
          disabled={loading}
        >
          <HiOutlineDocumentAdd />
        </button>
        <button
          className={`btn text-lg ${mode === 'list' ? 'btn-active' : ''}`}
          onClick={() => setMode('list')}
          disabled={loading}
        >
          <IoDocumentsOutline />
        </button>
        <div className='dropdown-end dropdown'>
          <label tabIndex={0} className='btn flex-col justify-around'>
            <BsPalette2 size='15px' />
          </label>
          {themeList()}
        </div>
      </div>
    </div>
  )
}
