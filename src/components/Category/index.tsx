import { CategoryAtom } from '@/atoms/Category'
import { Ingredient } from '@/domains/ingredient'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

export const Setting = () => {
  const categories = ['なし', '和食', '洋食', '中華'] as const
  const [category, setCategory] = useRecoilState(CategoryAtom)

  return (
    <div>
      <h3>カテゴリ</h3>
      <select
        className='select select-bordered w-fit my-3'
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
