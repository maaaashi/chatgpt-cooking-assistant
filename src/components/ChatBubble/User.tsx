import React from 'react'

export const User = () => {
  return (
    <div className='chat chat-end'>
      <div className='chat-header'>
        Anakin
        <time className='text-xs opacity-50'>12:46</time>
      </div>
      <div className='chat-bubble'>I hate you!</div>
      <div className='chat-footer opacity-50'>Seen at 12:46</div>
    </div>
  )
}
