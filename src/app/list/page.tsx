'use client'

import { Recipe } from '@/domains/recipe'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const router = useRouter()

  const listRecipe = async () => {
    const url = process.env.NEXT_PUBLIC_LIST_RECIPES_URL!
    const response = await fetch(url)
    const { recipes } = await response.json()

    setRecipes(() => {
      return recipes.map((d: any) => {
        return new Recipe(d.id, d.title, d.recipe, d.imageUrl, d.prompt)
      })
    })
  }

  useEffect(() => {
    listRecipe()
  }, [])

  return (
    <div className='flex flex-wrap p-5 gap-5 justify-center container mx-auto'>
      {recipes.map((r, i) => {
        return (
          <button
            className='card bg-base-100 shadow-xl max-w-sm w-1/4 group hover:bg-base-300 hover:shadow-lg'
            key={i}
            onClick={() => router.push(`/recipe/${r.id}`)}
          >
            <figure className='bg-base-300 relative'>
              <div className='absolute w-full h-full bg-transparent group-hover:bg-transparent-base'></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.imageUrl} alt={r.title} />
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
