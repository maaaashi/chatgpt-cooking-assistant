import { Ingredient } from '@/domains/ingredient'
import React, { FC, FormEvent } from 'react'
import { IngredientForm } from '.'

interface Props {
  title: string
  use: boolean
}

export const IngredientList: FC<Props> = ({ title, use }) => {
  const ingredients: Ingredient[] = []

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <h3>{title}</h3>
      {ingredients.map((ingredient, i) => (
        <IngredientForm key={i} ingredient={ingredient} />
      ))}

      <form onSubmit={submitHandler} className='flex'>
        <input
          type='text'
          placeholder='食材を入力してください'
          className='input input-bordered w-full max-w-xs'
        />
        <button className='btn'>追加</button>
      </form>
    </div>
  )
}
