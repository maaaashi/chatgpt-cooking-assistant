import Image from 'next/image'
import React from 'react'

export const AI = () => {
  return (
    <div className='chat chat-start'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <Image src='/icons/AI.png' alt='AI' />
        </div>
      </div>
      <div className='chat-header'>
        Obi-Wan Kenobi
        <time className='text-xs opacity-50'>12:45</time>
      </div>
      <div className='chat-bubble'>You were the Chosen One!</div>
      <div className='chat-footer opacity-50'>Delivered</div>
    </div>
  )
}
