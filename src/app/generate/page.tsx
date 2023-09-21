'use client'

import { Generate } from '@/components/Generate'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

export default function Home() {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className='flex flex-col'>
      <main className='flex-1'>
        <Generate />
      </main>
    </div>
  )
}
