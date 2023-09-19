'use client'

import { LoadingAtom } from '@/atoms/Loading'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { FaThList } from 'react-icons/fa'
import { AiOutlineCheck } from 'react-icons/ai'
import { BsPalette2 } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import HeaderButton from '../Button/HeaderButton'

export const Header = () => {
  const router = useRouter()
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
      <h1 className='font-bold text-lg'>{'ChatGPT Cooking Assistant'}</h1>
      <div className='hidden md:flex md:gap-2'>
        <HeaderButton clickFunc={() => router.push('/')}>
          <HiOutlineDocumentAdd size='15px' />
          GENERATE
        </HeaderButton>
        <HeaderButton clickFunc={() => router.push('/list')}>
          <FaThList size='15px' />
          LIST
        </HeaderButton>
        <div className='dropdown-end dropdown'>
          <label
            tabIndex={0}
            className='btn btn-outline btn-info flex-col justify-around'
          >
            <BsPalette2 size='15px' />
            THEME
          </label>
          {themeList()}
        </div>
      </div>
      <div className='md:hidden flex gap-2'>
        <HeaderButton clickFunc={() => router.push('/')}>
          <HiOutlineDocumentAdd size='15px' />
        </HeaderButton>
        <HeaderButton clickFunc={() => router.push('/list')}>
          <FaThList size='15px' />
        </HeaderButton>
        <div className='dropdown-end dropdown'>
          <label
            tabIndex={0}
            className='btn btn-outline btn-info flex-col justify-around'
          >
            <BsPalette2 size='15px' />
          </label>
          {themeList()}
        </div>
      </div>
    </div>
  )
}
