'use client'

import { ChatAtom } from '@/atoms/Chat'
import { LoadingAtom } from '@/atoms/Loading'
import { AI } from '@/components/ChatBubble/Ai'
import { ImageComponent } from '@/components/ChatBubble/Image'
import { User } from '@/components/ChatBubble/User'
import { UserInput } from '@/components/UserInput'
import { Chat } from '@/domains/chat'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { themeChange } from 'theme-change'

const Page = () => {
  const loading = useRecoilValue(LoadingAtom)

  const chats = useRecoilValue(ChatAtom)
  const switchViewChat = ({ type, text, date, src }: Chat, index: number) => {
    switch (type) {
      case 'AI':
        return <AI text={text} date={date} key={index} />
      case 'User':
        return <User text={text} date={date} key={index} />
      case 'Image':
        return <ImageComponent src={src!} text='画像' />
    }
  }

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className='flex-1 flex flex-col overflow-y-auto'>
      <div className='flex-1 container mx-auto bg-base-300 p-5'>
        {chats.map(switchViewChat)}
        <div className='flex justify-center'>
          {loading ? (
            <span className='loading loading-dots loading-lg'></span>
          ) : (
            ''
          )}
        </div>
      </div>
      <UserInput />
    </div>
  )
}

export default Page
