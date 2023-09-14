import { CategoryAtom } from '@/atoms/Category'
import { LoadingAtom } from '@/atoms/Loading'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export const Setting = () => {
  const categories = ['なし', '和食', '洋食', '中華'] as const
  const [category, setCategory] = useRecoilState(CategoryAtom)
  const loading = useRecoilValue(LoadingAtom)

  return (
    <div>
      <h3>カテゴリ</h3>
      <select
        className='select select-bordered w-fit my-3'
        disabled={loading}
        onChange={(e) => {
          const value = e.target.value as (typeof categories)[number]
          setCategory(value)
        }}
        value={category}
      >
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
