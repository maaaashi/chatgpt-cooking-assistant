'use client'

import Image from 'next/image'
import React, { DialogHTMLAttributes, FC, useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { themeChange } from 'theme-change'

interface Props {
  params: {
    id: string
  }
}

interface Recipe {
  id: number
  imageUrl: string
  prompt: string
  recipe: string
  title: string
}

const getData = async (id: string) => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL! + '/findRecipe')
  url.searchParams.append('id', id)

  const response = await fetch(url)
  const { recipe } = await response.json()
  return recipe
}

const Page: FC<Props> = ({ params }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const setRecipeFromDB = async () => {
    const recipe = await getData(params.id)
    setRecipe(recipe)
  }

  useEffect(() => {
    themeChange(false)
    setRecipeFromDB()
  }, [])

  useEffect(() => {
    if (!recipe || !recipe.prompt) return

    const modal = document.getElementById('my_modal_2')! as HTMLDialogElement

    modal.showModal()
  }, [recipe])

  if (!recipe)
    return (
      <div className='h-screen flex items-center justify-center'>
        <span className='loading loading-ball loading-lg'></span>
      </div>
    )

  return (
    <div className='bg-base-300 overflow-y-auto'>
      <dialog id='my_modal_2' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>以下内容で生成されました。</h3>
          <div className='prose'>
            <ReactMarkdown>{recipe.prompt}</ReactMarkdown>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      <div className='mx-auto container flex md:flex-row-reverse flex-col items-center md:block bg-base-100 p-5'>
        <div className='md:float-right w-fit h-fit'>
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{ position: 'inherit' }}
            width={300}
            height={200}
          />
        </div>
        <div className='prose'>
          <ReactMarkdown>{recipe.recipe}</ReactMarkdown>
          {/* {recipe.recipe} */}
        </div>
      </div>
    </div>
  )
}

export default Page
