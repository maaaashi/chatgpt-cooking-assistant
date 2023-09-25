'use client'
import Image from 'next/image'
import React, { FC } from 'react'

interface Props {
  text: string
  src: string
}

export const ImageComponent: FC<Props> = ({ text, src }) => {
  return (
    <div className='chat chat-start'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <Image src='/icons/AI.png' alt='AI' width={'336'} height={'336'} />
        </div>
      </div>
      <div className='chat-header'>AI Assistant</div>
      <div className='chat-bubble'>
        <Image src={src} alt={text} width={'336'} height={'336'} />
      </div>
    </div>
  )
}
