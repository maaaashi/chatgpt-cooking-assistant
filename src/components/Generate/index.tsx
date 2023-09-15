import { Setting } from '@/components/Category'
import { IngredientList } from '@/components/IngredientList'
import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { IngredientsAtom } from '@/atoms/Ingredients'
import { CategoryAtom } from '@/atoms/Category'
import Swal from 'sweetalert2'
import { SelectRecipeAtom } from '@/atoms/SelectRecipe'
import { ModeAtom } from '@/atoms/Mode'
import { Recipe } from '@/domains/recipe'
import { LoadingAtom } from '@/atoms/Loading'

export const Generate = () => {
  const ingredientList = useRecoilValue(IngredientsAtom)
  const category = useRecoilValue(CategoryAtom)
  const [other, setOther] = useState('')
  const setRecipe = useSetRecoilState(SelectRecipeAtom)
  const setMode = useSetRecoilState(ModeAtom)
  const [loading, setLoading] = useRecoilState(LoadingAtom)
  const setIngredientList = useSetRecoilState(IngredientsAtom)

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

    setRecipe(undefined)
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

    const { recipe, imageUrl, prompt, title } = await response.json()
    const addRecipe = new Recipe(title, recipe, imageUrl, prompt)

    setIngredientList([])
    setRecipe(addRecipe)
    setMode('view')
    setLoading(false)
  }

  return (
    <div className='flex flex-col' style={{ height: 'calc(100vh - 140px)' }}>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-5 justify-center'>
          <Setting />
          <IngredientList title='使いたい食材' use={true} />
          <IngredientList title='使いたくない食材' use={false} />
        </div>

        <div className='flex flex-col w-4/5 mx-auto'>
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
