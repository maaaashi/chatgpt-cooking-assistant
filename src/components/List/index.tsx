import { ModeAtom } from '@/atoms/Mode'
import { SelectRecipeAtom } from '@/atoms/SelectRecipe'
import { Recipe } from '@/domains/recipe'
import React, { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const List = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const setMode = useSetRecoilState(ModeAtom)
  const setRecipe = useSetRecoilState(SelectRecipeAtom)

  const listRecipe = async () => {
    const response = await fetch('/api/listRecipe')
    const json = await response.json()

    console.log(json)
    setRecipes(() => {
      return json.map((d: any) => {
        return new Recipe(d.id, d.title, d.recipe, d.imageUrl, d.prompt)
      })
    })
  }

  useEffect(() => {
    listRecipe()
  }, [])

  const clickHandler = (recipe: Recipe) => {
    setMode('view')
    setRecipe(recipe)
  }

  return (
    <>
      {recipes.map((r, i) => {
        return (
          <div className='card lg:card-side bg-base-100 shadow-xl' key={i}>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.imageUrl} alt={r.title} />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>{r.title}</h2>
              <div className='prose prose-sm mx-auto'>
                <ReactMarkdown>{r.recipe}</ReactMarkdown>
              </div>
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    clickHandler(r)
                  }}
                >
                  表示
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
