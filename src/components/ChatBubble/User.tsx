'use client'

import { useShowData } from '@/hooks/useShowData'
import React, { FC } from 'react'

interface Props {
  text: string
  date?: Date
}

export const User: FC<Props> = ({ text, date }) => {
  const [textToShow, dateToShow] = useShowData(text, date)

  return (
    <div className='chat chat-end'>
      <div className='chat-header'>You</div>
      <div className='chat-bubble'>{textToShow}</div>
      <time className='chat-footer text-xs opacity-50'>{dateToShow}</time>
    </div>
  )
}
