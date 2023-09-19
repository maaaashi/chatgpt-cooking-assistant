import { Ingredient } from '@/domains/ingredient'
import React, { FC, FormEvent, useState } from 'react'
import { IngredientForm } from '@/components/IngredientForm'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IngredientsAtom } from '@/atoms/Ingredients'
import { LoadingAtom } from '@/atoms/Loading'
import { GrAddCircle } from 'react-icons/gr'

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
        <div className='flex-1'>
          <label
            htmlFor={`ingredient-${use ? 'use' : 'not-use'}`}
            className='label'
          >
            <span className='text-xs md:text-sm'>{title}</span>
          </label>
          <input
            type='text'
            id={`ingredient-${use ? 'use' : 'not-use'}`}
            disabled={loading}
            placeholder='食材を入力してください'
            required
            className='input input-bordered w-full'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <button className='btn font-bold self-end text-lg' disabled={loading}>
          <GrAddCircle />
        </button>
      </form>

      <ul className='space-y-1 text-gray-500 overflow-y-auto'>
        <li className='mx-auto w-4/5 border-b-2 h-7'>
          <div className='flex items-center justify-between w-2/3 mx-auto gap-3 text-gray-400'>
            {'例) かぼちゃ'}
          </div>
        </li>
        {ingredientList
          .filter((i) => i.use === use)
          .map((ingredient, i) => (
            <IngredientForm key={ingredient.id} ingredient={ingredient} />
          ))}
      </ul>
    </div>
  )
}
