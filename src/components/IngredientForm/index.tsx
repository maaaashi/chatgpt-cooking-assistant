import { IngredientsAtom } from '@/atoms/Ingredients'
import { Ingredient } from '@/domains/ingredient'
import React, { ChangeEvent, FC, FormEvent, useRef, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import { useSetRecoilState } from 'recoil'

interface Props {
  ingredient: Ingredient
}

export const IngredientForm: FC<Props> = ({ ingredient }) => {
  const setIngredientList = useSetRecoilState(IngredientsAtom)
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(ingredient.name)
  const ref = useRef<HTMLInputElement>(null)

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
    <li className='flex items-center justify-between w-2/3 mx-auto gap-3'>
      {edit ? (
        <input
          ref={ref}
          className='w-full p-1 rounded border border-dashed border-black'
          defaultValue={name}
        />
      ) : (
        <span>{ingredient.name}</span>
      )}
      <div className='flex items-center gap-2'>
        <button onClick={updateIngdient} className={edit ? 'text-primary' : ''}>
          <BiSolidMessageSquareEdit size={20} />
        </button>
        <button
          onClick={deleteIngdient}
          className='text-red-400 hover:text-red-600 w-fit'
        >
          <AiFillCloseSquare size={20} />
        </button>
      </div>
    </li>
  )
}
