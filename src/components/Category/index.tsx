import { CategoryAtom } from '@/atoms/Category'
import { LoadingAtom } from '@/atoms/Loading'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export const Category = () => {
  const categories = ['なし', '和食', '洋食', '中華'] as const
  const [category, setCategory] = useRecoilState(CategoryAtom)
  const loading = useRecoilValue(LoadingAtom)

  return (
    <div className='form-control my-3'>
      <label htmlFor='category' className='label'>
        <span className='text-xs md:text-sm'>カテゴリ</span>
      </label>
      <select
        id='category'
        className='select select-bordered w-full md:w-fit'
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
