'use client'

import { Header } from '@/components/Header'
import { Generate } from '@/components/Generate'
import { List } from '@/components/List'
import { useRecoilValue } from 'recoil'
import { ModeAtom } from '@/atoms/Mode'
import { View } from '@/components/View'

export default function Home() {
  const mode = useRecoilValue(ModeAtom)

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
      <main className='flex-1'>{mainView()}</main>
    </div>
  )
}
