import { Ingredient } from '@/domains/ingredient'
import React, { FC } from 'react'

interface Props {
  ingredient: Ingredient
}

export const IngredientForm: FC<Props> = ({ ingredient }) => {
  return (
    <input
      type='text'
      placeholder='Type here'
      className='input input-bordered w-full max-w-xs'
    />
  )
}
