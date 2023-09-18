import { IngredientsAtom } from '@/atoms/Ingredients'
import { LoadingAtom } from '@/atoms/Loading'
import { Ingredient } from '@/domains/ingredient'
import React, { FC, useRef, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface Props {
  ingredient: Ingredient
}

export const IngredientForm: FC<Props> = ({ ingredient }) => {
  const setIngredientList = useSetRecoilState(IngredientsAtom)
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(ingredient.name)
  const ref = useRef<HTMLInputElement>(null)
  const loading = useRecoilValue(LoadingAtom)

  const deleteIngdient = () => {
    setIngredientList((c) => {
      const targetIndex = c.findIndex((cc) => cc.id === ingredient.id)

      if (targetIndex === -1) return c

      const newIngredients = [...c]
      newIngredients.splice(targetIndex, 1)

      return newIngredients
    })
  }

  const updateIngdient = () => {
    setEdit(!edit)

    if (!edit) return
    if (!ref.current) return

    setName(ref.current.value)

    setIngredientList((c) => {
      if (!ref.current) return c

      const targetIndex = c.findIndex((cc) => cc.id === ingredient.id)

      if (targetIndex === -1) return c

      return c.map((cc, index) => {
        if (index === targetIndex)
          return new Ingredient(ref.current!.value, ingredient.use)

        return cc
      })
    })
  }

  return (
    <li className='w-full border-b-2 h-7'>
      <div className='flex items-center justify-between w-2/3 mx-auto gap-3'>
        {edit ? (
          <input
            ref={ref}
            className='w-full p-1 rounded border border-dashed border-black'
            defaultValue={name}
            disabled={loading}
          />
        ) : (
          <span>{ingredient.name}</span>
        )}
        <div className='flex items-center gap-2'>
          <button
            onClick={updateIngdient}
            className={
              edit
                ? 'text-primary hover:text-primary-focus disabled:text-primary'
                : 'text-gray-500 hover:text-gray-400 disabled:text-gray-500'
            }
            disabled={loading}
          >
            <BiSolidMessageSquareEdit size={20} />
          </button>
          <button
            onClick={deleteIngdient}
            disabled={loading}
            className='text-red-400 hover:text-red-600 w-fit disabled:text-red-600'
          >
            <AiFillCloseSquare size={20} />
          </button>
        </div>
      </div>
    </li>
  )
}
