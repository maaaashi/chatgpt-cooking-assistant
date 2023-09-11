'use client'

import { Header } from '@/components/Header'
import { Setting } from '@/components/Category'
import { IngredientList } from '@/components/IngredientList'
import { Ingredient } from '@/domains/ingredient'
import { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { IngredientsAtom } from '@/atoms/Ingredients'
import { CategoryAtom } from '@/atoms/Category'
import Swal from 'sweetalert2'

export default function Home() {
  const ingredientList = useRecoilValue(IngredientsAtom)
  const category = useRecoilValue(CategoryAtom)

  const wrapListTag = (text: string) => {
    return `<li>${text}</li>`
  }

  const generatePrompt = async () => {
    const useList = ingredientList.filter((i) => i.use)
    const notUseList = ingredientList.filter((i) => !i.use)
    const confirm = await Swal.fire({
      title: '次の内容でよろしいですか',
      html: `
      <div>
        カテゴリ
        ${wrapListTag(category)}
      </div>
      <div>
        使いたい食材
        ${
          useList.length
            ? useList.map((l) => wrapListTag(l.name))
            : wrapListTag('なし')
        }
      </div>
      <div>
        使いたくない食材
        ${
          notUseList.length
            ? notUseList.map((l) => wrapListTag(l.name))
            : wrapListTag('なし')
        }
      </div>
      `,
      showCancelButton: true,
    })

    if (!confirm.isConfirmed) return
  }

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-1 flex gap-5 justify-center'>
        <Setting />
        <IngredientList title='使いたい食材' use={true} />
        <IngredientList title='使いたくない食材' use={false} />
      </main>
      <footer className='p-3'>
        <button onClick={generatePrompt} className='btn btn-primary w-full'>
          レシピ生成！
        </button>
      </footer>
    </div>
  )
}
