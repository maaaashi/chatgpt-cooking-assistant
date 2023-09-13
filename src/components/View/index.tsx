import { SelectRecipeAtom } from '@/atoms/SelectRecipe'
import { Recipe } from '@/domains/recipe'
import React, { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useRecoilValue } from 'recoil'

export const View = () => {
  const recipe = useRecoilValue(SelectRecipeAtom)

  if (!recipe) return <></>

  return (
    <div className='prose'>
      <ReactMarkdown>{recipe.recipe}</ReactMarkdown>
    </div>
  )
}
