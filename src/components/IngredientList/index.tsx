import { Ingredient } from '@/domains/ingredient'
import React, { FC, FormEvent, useState } from 'react'
import { IngredientForm } from '@/components/IngredientForm'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IngredientsAtom } from '@/atoms/Ingredients'
import { LoadingAtom } from '@/atoms/Loading'

interface Props {
  title: string
  use: boolean
}

export const IngredientList: FC<Props> = ({ title, use }) => {
  const [ingredientList, setIngredientLIst] = useRecoilState(IngredientsAtom)
  const [name, setName] = useState('')
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    const newIngredient = new Ingredient(name, use)
    setIngredientLIst((c) => [...c, newIngredient])

    setName('')
  }

  const loading = useRecoilValue(LoadingAtom)

  return (
    <div>
      <form onSubmit={submitHandler} className='flex my-3'>
        <div>
          <label htmlFor={`ingredient-${use ? 'use' : 'not-use'}`}>
            {title}
          </label>
          <input
            type='text'
            id={`ingredient-${use ? 'use' : 'not-use'}`}
            disabled={loading}
            placeholder='食材を入力してください'
            required
            className='input input-bordered w-full max-w-xs'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <button className='btn self-end' disabled={loading}>
          追加
        </button>
      </form>

      <ul
        className='space-y-1 text-gray-500 overflow-y-auto'
        style={{ height: 'calc(100vh - 400px)' }}
      >
        {ingredientList
          .filter((i) => i.use === use)
          .map((ingredient, i) => (
            <IngredientForm key={ingredient.id} ingredient={ingredient} />
          ))}
      </ul>
    </div>
  )
}
