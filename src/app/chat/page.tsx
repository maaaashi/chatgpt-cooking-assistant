'use client'

import { ChatAtom } from '@/atoms/Chat'
import { AI } from '@/components/ChatBubble/Ai'
import { User } from '@/components/ChatBubble/User'
import { UserInput } from '@/components/UserInput'
import { Chat } from '@/domains/chat'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Page = () => {
  const chats = useRecoilValue(ChatAtom)
  const switchViewChat = ({ type, text, date }: Chat, index: number) => {
    switch (type) {
      case 'AI':
        return <AI text={text} date={date} key={index} />
      case 'User':
        return <User text={text} date={date} key={index} />
    }
  }

  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex-1 container mx-auto bg-base-300 p-5'>
        {chats.map(switchViewChat)}
      </div>
      <UserInput />
    </div>
  )
}

export default Page
