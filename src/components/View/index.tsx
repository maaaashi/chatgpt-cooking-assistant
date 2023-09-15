import { SelectRecipeAtom } from '@/atoms/SelectRecipe'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useRecoilValue } from 'recoil'

export const View = () => {
  const recipe = useRecoilValue(SelectRecipeAtom)

  if (!recipe) return <></>

  return (
    <div className='mx-auto container flex md:flex-row-reverse flex-col items-center md:block'>
      <div className='md:float-right w-fit h-fit'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={recipe.imageUrl} alt={recipe.title} width={300} />
      </div>
      <div className='prose'>
        <ReactMarkdown>{recipe.recipe}</ReactMarkdown>
      </div>
    </div>
  )
}
