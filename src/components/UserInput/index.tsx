import { ChatAtom } from '@/atoms/Chat'
import { LoadingAtom } from '@/atoms/Loading'
import { Chat } from '@/domains/chat'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Swal from 'sweetalert2'

export const UserInput = () => {
  const setChats = useSetRecoilState(ChatAtom)
  const [text, setText] = useState('')
  const [loading, setLoading] = useRecoilState(LoadingAtom)
  const formRef = useRef<HTMLFormElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const confirm = await Swal.fire({
      title: '次の内容でよろしいですか',
      text: text,
      showCancelButton: true,
    })

    if (!confirm.isConfirmed) return

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
      const recipeChat = new Chat(
        'AI',
        `${recipe}  また、これまで作成されたレシピは[こちら](/list)で確認できます。`,
        new Date()
      )
      setChats((c) => [...c, imageChat, recipeChat])
      setText('')
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!textRef.current) return

    textRef.current.addEventListener('focus', () => {
      if (!formRef.current) return

      formRef.current.classList.add('border')
      formRef.current.classList.add('border-black')
    })

    textRef.current.addEventListener('blur', () => {
      if (!formRef.current) return

      formRef.current.classList.remove('border')
      formRef.current.classList.remove('border-black')
    })
  }, [])

  return (
    <div className='bg-base-200 p-5'>
      <form
        onSubmit={submitHandler}
        className='bg-base-100 flex gap-3 items-center rounded-md pr-3'
        ref={formRef}
      >
        <textarea
          className='textarea w-full resize-none focus:outline-none'
          placeholder='風邪の引き始めに効く食べ物を使った料理'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          disabled={loading}
          ref={textRef}
        ></textarea>
        <button
          type='submit'
          className='btn btn-primary btn-circle btn-outline'
          disabled={loading}
        >
          <AiOutlineSend size='25' />
        </button>
      </form>
    </div>
  )
}
