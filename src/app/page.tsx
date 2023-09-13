'use client'

import { Header } from '@/components/Header'
import { useState } from 'react'
import { Generate } from '@/components/Generate'
import { List } from '@/components/List'

export default function Home() {
  const [mode, setMode] = useState<'generate' | 'list'>('generate')

  const mainView = () => {
    switch (mode) {
      case 'generate':
        return <Generate />
      case 'list':
        return <List />
    }
  }

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>
        <div className='btn-group w-full p-5'>
          <button
            className={`w-1/2 btn ${mode === 'generate' ? 'btn-active' : ''}`}
            onClick={() => setMode('generate')}
          >
            レシピ生成
          </button>
          <button
            className={`w-1/2 btn ${mode === 'list' ? 'btn-active' : ''}`}
            onClick={() => setMode('list')}
          >
            過去レシピ
          </button>
        </div>
        {mainView()}
      </main>
    </div>
  )
}
