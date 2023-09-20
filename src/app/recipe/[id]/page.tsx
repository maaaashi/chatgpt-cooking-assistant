'use client'

import React, { DialogHTMLAttributes, FC, useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

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
  const url = new URL(process.env.NEXT_PUBLIC_FIND_RECIPE_URL!)
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
    <div>
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
      <div className='mx-auto container flex md:flex-row-reverse flex-col items-center md:block'>
        <div className='md:float-right w-fit h-fit'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recipe.imageUrl} alt={recipe.title} width={300} />
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
