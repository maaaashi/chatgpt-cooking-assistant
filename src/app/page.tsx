'use client'

import { Header } from '@/components/Header'
import { Generate } from '@/components/Generate'
import { List } from '@/components/List'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ModeAtom } from '@/atoms/Mode'
import { View } from '@/components/View'
import { LoadingAtom } from '@/atoms/Loading'

export default function Home() {
  const [mode, setMode] = useRecoilState(ModeAtom)
  const loading = useRecoilValue(LoadingAtom)

  const mainView = () => {
    switch (mode) {
      case 'generate':
        return <Generate />
      case 'list':
        return <List />
      case 'view':
        return <View />
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
            disabled={loading}
          >
            レシピ生成
          </button>
          <button
            className={`w-1/2 btn ${mode === 'list' ? 'btn-active' : ''}`}
            onClick={() => setMode('list')}
            disabled={loading}
          >
            過去レシピ
          </button>
        </div>
        {mainView()}
      </main>
    </div>
  )
}
