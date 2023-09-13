import { SelectRecipeAtom } from '@/atoms/SelectRecipe'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useRecoilValue } from 'recoil'

export const View = () => {
  const recipe = useRecoilValue(SelectRecipeAtom)

  if (!recipe) return <></>

  return (
    <div className='prose w-full max-w-full'>
      <div className='float-right p-4 bg-base-300 w-fit h-fit'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={recipe.imageUrl} alt={recipe.title} width={300} />
      </div>
      <ReactMarkdown>{recipe.recipe}</ReactMarkdown>
    </div>
  )
}
