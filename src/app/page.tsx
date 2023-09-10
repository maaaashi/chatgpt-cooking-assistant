'use client'

import { Header } from '@/components/Header'
import { Setting } from '@/components/Category'
import { IngredientList } from '@/components/IngredientList'
import { Ingredient } from '@/domains/ingredient'
import { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { IngredientsAtom } from '@/atoms/Ingredients'

export default function Home() {
  const [ingredientList, setIngredientLIst] = useRecoilState(IngredientsAtom)

  return (
    <>
      <Header />
      <main>
        <Setting />
        <div className='flex'>
          <div>
            <IngredientList title='使いたい食材' use={true} />
          </div>
          <IngredientList title='使いたくない食材' use={false} />
        </div>
      </main>
    </>
  )
}
