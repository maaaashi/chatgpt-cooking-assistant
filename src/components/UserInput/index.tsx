import { ChatAtom } from '@/atoms/Chat'
import { LoadingAtom } from '@/atoms/Loading'
import { Chat } from '@/domains/chat'
import React, { FormEvent, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const UserInput = () => {
  const setChats = useSetRecoilState(ChatAtom)
  const [text, setText] = useState('')
  const [loading, setLoading] = useRecoilState(LoadingAtom)

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const addChat = new Chat('User', text, new Date())
    setChats((c) => [...c, addChat])

    const url = process.env.NEXT_PUBLIC_GENERATE_RECIPE_URL!

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        message: text,
      }),
    })
    const { recipe, title, imageUrl } = await response.json()

    if (recipe === 'ERROR') {
      const errorChat = new Chat(
        'AI',
        `レシピが生成できませんでした。  
        情報を増やして再度お試しください。  
        また、私は過去のメッセージをさかのぼることができませんので、その点ご注意ください。`,
        new Date()
      )

      setChats((c) => [...c, errorChat])
    } else {
      const imageChat = new Chat('Image', title, new Date(), imageUrl)
      const recipeChat = new Chat('AI', recipe, new Date())
      setChats((c) => [...c, imageChat, recipeChat])
      setText('')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={submitHandler} className='bg-base-200 p-5 relative'>
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        placeholder='風邪の引き始めに効く食べ物を使った料理'
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        disabled={loading}
      ></textarea>
      <button
        type='submit'
        className='btn btn-primary btn-circle btn-outline absolute right-8 top-8'
        disabled={loading}
      >
        <AiOutlineSend size='25' />
      </button>
    </form>
  )
}
