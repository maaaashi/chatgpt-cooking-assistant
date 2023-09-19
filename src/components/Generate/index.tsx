import { Category } from '@/components/Category'
import { IngredientList } from '@/components/IngredientList'
import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { IngredientsAtom } from '@/atoms/Ingredients'
import { CategoryAtom } from '@/atoms/Category'
import Swal from 'sweetalert2'
import { LoadingAtom } from '@/atoms/Loading'
import { useRouter } from 'next/navigation'

export const Generate = () => {
  const ingredientList = useRecoilValue(IngredientsAtom)
  const category = useRecoilValue(CategoryAtom)
  const [other, setOther] = useState('')
  const [loading, setLoading] = useRecoilState(LoadingAtom)
  const setIngredientList = useSetRecoilState(IngredientsAtom)
  const router = useRouter()

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
          useList.length > 0
            ? useList.map((l) => wrapListTag(l.name)).join('')
            : wrapListTag('なし')
        }
      </div>
      <div>
        使いたくない食材
        ${
          notUseList.length > 0
            ? notUseList.map((l) => wrapListTag(l.name)).join('')
            : wrapListTag('なし')
        }
      </div>
      <div>
        その他<br>
        ${other}
      </div>`,
      showCancelButton: true,
    })

    if (!confirm.isConfirmed) return

    setLoading(true)

    const url = process.env.NEXT_PUBLIC_GENERATE_RECIPE_URL!

    const message = `
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

    ### その他
    ${other}
    `

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        message,
      }),
    })

    const { id, recipe } = await response.json()

    if (recipe === 'ERROR') {
      alert('レシピの生成に失敗しました。')
      setLoading(false)
      return
    }

    setIngredientList([])
    setLoading(false)
    router.push(`/recipe/${id}`)
  }

  return (
    <div className='flex flex-col h-full p-3'>
      <div className='flex flex-col flex-1'>
        <div className='flex flex-col md:flex-row gap-5 justify-center'>
          <Category />
          <IngredientList title='使いたい食材' use={true} />
          <IngredientList title='使いたくない食材' use={false} />
        </div>

        <div className='flex flex-col container mx-auto mt-4'>
          <label htmlFor='other'>その他</label>
          <textarea
            id='other'
            className='textarea textarea-bordered resize-none'
            placeholder='レンジで簡単にできる'
            value={other}
            onChange={(e) => {
              setOther(e.target.value)
            }}
            disabled={loading}
          ></textarea>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={generateRecipe}
        className='btn btn-primary w-full'
      >
        {loading ? (
          <>
            考え中<span className='loading loading-dots loading-md'></span>
          </>
        ) : (
          'レシピ生成'
        )}
      </button>
    </div>
  )
}
