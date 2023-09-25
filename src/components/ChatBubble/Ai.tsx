'use client'

import { useShowData } from '@/hooks/useShowData'
import Image from 'next/image'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  text: string
  date?: Date
}

export const AI: FC<Props> = ({ text, date }) => {
  const [textToShow, dateToShow] = useShowData(text, date)

  return (
    <div className='chat chat-start'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <Image src='/icons/AI.png' alt='AI' width={'336'} height={'336'} />
        </div>
      </div>
      <div className='chat-header'>AI Assistant</div>
      <div className='chat-bubble'>
        <article className='prose text-neutral-content'>
          <ReactMarkdown>{textToShow}</ReactMarkdown>
        </article>
      </div>
      <time className='chat-footer text-xs opacity-50'>{dateToShow}</time>
    </div>
  )
}
