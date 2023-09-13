import { Recipe } from '@/domains/recipe'
import React, { useEffect, useState } from 'react'

export const List = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const listRecipe = async () => {
    const response = await fetch('/api/listRecipe')
    const json = await response.json()

    console.log(json)
    setRecipes(() => {
      return json.map((d) => {
        return new Recipe(d.id, d.imageUrl, d.title, d.prompt)
      })
    })
  }

  useEffect(() => {
    listRecipe()
  }, [])

  return (
    <>
      {recipes.map((r, i) => {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.imageUrl} alt={r.title} key={i} />
        )
      })}
    </>
  )
}
