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
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>
        <Setting />
        <div className='flex gap-5 justify-center'>
          <IngredientList title='使いたい食材' use={true} />
          <IngredientList title='使いたくない食材' use={false} />
        </div>
      </main>
      <footer className='p-3'>
        <button className='btn btn-primary w-full'>レシピ生成！</button>
      </footer>
    </div>
  )
}
