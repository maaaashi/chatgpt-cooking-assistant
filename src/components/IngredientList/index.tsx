import { Ingredient } from '@/domains/ingredient'
import React, { FC } from 'react'
import { IngredientForm } from '../IngredientForm'

interface Props {
  title: string
  use: boolean
}

export const IngredientList: FC<Props> = ({ title, use }) => {
  const ingredients: Ingredient[] = []

  return (
    <div>
      <h3>{title}</h3>
      {ingredients.map((ingredient, i) => (
        <IngredientForm key={i} ingredient={ingredient} />
      ))}
      <h3>追加</h3>
      <input
        type='text'
        placeholder='食材を入力してください'
        className='input input-bordered w-full max-w-xs'
      />
      <button className='btn'>追加</button>
    </div>
  )
}
