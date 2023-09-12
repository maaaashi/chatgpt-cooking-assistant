'use client'

import { Header } from '@/components/Header'
import { Setting } from '@/components/Category'
import { IngredientList } from '@/components/IngredientList'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { IngredientsAtom } from '@/atoms/Ingredients'
import { CategoryAtom } from '@/atoms/Category'
import Swal from 'sweetalert2'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function Home() {
  const ingredientList = useRecoilValue(IngredientsAtom)
  const category = useRecoilValue(CategoryAtom)
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)

  const wrapListTag = (text: string) => {
    return `<li>${text}</li>`
  }

  const generateRecipe = async () => {
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
      </div>`,
      showCancelButton: true,
    })

    if (!confirm.isConfirmed) return

    setRecipe('')
    setLoading(true)

    const url = process.env.NEXT_PUBLIC_GENERATE_RECIPE_URL!

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        message: `
        ### カテゴリ
        ${category}

        ### 使いたい食材
        ${useList.map(
          (l) => `
        - ${l.name}`
        )}

        ### 使いたくない食材
        ${notUseList.map(
          (l) => `
        - ${l.name}`
        )}
        `,
      }),
    })

    const { content } = await response.json()

    setRecipe(content)
    setLoading(false)
  }

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>
        <div className='flex gap-5 justify-center'>
          <Setting />
          <IngredientList title='使いたい食材' use={true} />
          <IngredientList title='使いたくない食材' use={false} />
        </div>
        <button
          disabled={loading}
          onClick={generateRecipe}
          className='btn btn-primary w-full'
        >
          レシピ生成！
        </button>

        <div className='prose mx-auto'>
          <ReactMarkdown>{recipe}</ReactMarkdown>
        </div>
      </main>
    </div>
  )
}
