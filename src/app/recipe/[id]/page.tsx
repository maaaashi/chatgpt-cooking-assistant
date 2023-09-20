'use client'

import React, { FC, useEffect, useState } from 'react'
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

const Page: FC<Props> = ({ params }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const getData = async () => {
    const url = new URL(process.env.NEXT_PUBLIC_FIND_RECIPE_URL!)
    url.searchParams.append('id', params.id)

    const response = await fetch(url)
    const { recipe } = await response.json()
    setRecipe(recipe)
  }

  useEffect(() => {
    getData()
  }, [])

  if (!recipe)
    return (
      <div className='h-screen flex items-center justify-center'>
        <span className='loading loading-ball loading-lg'></span>
      </div>
    )

  return (
    <div>
      <div className='mx-auto container flex md:flex-row-reverse flex-col items-center md:block'>
        <div className='md:float-right w-fit h-fit'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recipe.imageUrl} alt={recipe.title} width={300} />
        </div>
        <div className='prose'>
          <ReactMarkdown>{recipe.recipe}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Page
