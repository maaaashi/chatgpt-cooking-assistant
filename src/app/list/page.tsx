'use client'

import { Recipe } from '@/domains/recipe'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const listRecipe = async (): Promise<Recipe[]> => {
  const url = process.env.NEXT_PUBLIC_LIST_RECIPES_URL!
  const response = await fetch(url)
  const { recipes } = await response.json()

  return recipes.map((d: any) => {
    return new Recipe(d.id, d.title, d.recipe, d.imageUrl, d.prompt)
  })
}

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const router = useRouter()

  const setRecipesFromDB = async () => {
    const recipes = await listRecipe()
    console.log(recipes)
    setRecipes(
      recipes.sort((a, b) => {
        if (a.id < b.id) return -1

        return 1
      })
    )
  }

  useEffect(() => {
    setRecipesFromDB()
  }, [])

  if (recipes.length === 0)
    return (
      <div className='h-screen flex items-center justify-center'>
        <span className='loading loading-ball loading-lg'></span>
      </div>
    )

  return (
    <div className='flex flex-wrap p-5 gap-5 justify-center container mx-auto'>
      {recipes.map((r, i) => {
        return (
          <button
            className='card bg-base-100 shadow-xl max-w-sm min-w-[155px] w-1/4 group hover:bg-base-300 hover:shadow-lg'
            key={i}
            onClick={() => router.push(`/recipe/${r.id}`)}
          >
            <figure className='bg-base-300 relative'>
              <div className='absolute w-full h-full bg-transparent group-hover:bg-transparent-base'></div>
              <Image
                src={r.imageUrl}
                alt={r.title}
                style={{ position: 'inherit' }}
                width={20000}
                height={200}
              />
            </figure>
            <div className='card-body'>
              <h2
                className='card-title overflow-hidden'
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                {r.title}
              </h2>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default Page
