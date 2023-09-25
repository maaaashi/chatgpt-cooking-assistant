import { ChatAtom } from '@/atoms/Chat'
import { Chat } from '@/domains/chat'
import React, { FormEvent, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'

export const UserInput = () => {
  const setChats = useSetRecoilState(ChatAtom)
  const [text, setText] = useState('')
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const addChat = new Chat('User', text, new Date())
    setText('')
    setChats((c) => [...c, addChat])
  }

  return (
    <form onSubmit={submitHandler} className='bg-base-200 p-5 relative'>
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        placeholder='風邪の引き始めに効く食べ物を使った料理'
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button
        type='submit'
        className='btn btn-primary btn-circle btn-outline absolute right-8 top-8'
      >
        <AiOutlineSend size='25' />
      </button>
    </form>
  )
}
