'use client'

import { AI } from '@/components/ChatBubble/Ai'
import { User } from '@/components/ChatBubble/User'
import { Chat } from '@/domains/chat'
import React, { useState } from 'react'

const Page = () => {
  const initialChat = [new Chat('AI', 'こんにちは！', new Date())]

  const [chats, setChats] = useState<Chat[]>(initialChat)
  const switchViewChat = ({ type, text, date }: Chat, index: number) => {
    switch (type) {
      case 'AI':
        return <AI text={text} date={date} key={index} />
      case 'User':
        return <User text={text} date={date} key={index} />
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='bg-base-300 p-5'>{chats.map(switchViewChat)}</div>
    </div>
  )
}

export default Page
