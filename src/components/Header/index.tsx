'use client'

import { LoadingAtom } from '@/atoms/Loading'
import { ModeAtom } from '@/atoms/Mode'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { IoDocumentsOutline } from 'react-icons/io5'

export const Header = () => {
  const [mode, setMode] = useRecoilState(ModeAtom)
  const loading = useRecoilValue(LoadingAtom)
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
      </div>
    </div>
  )
}
