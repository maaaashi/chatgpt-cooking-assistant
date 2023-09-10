import { Ingredient } from '@/domains/ingredient'
import React, { useState } from 'react'

export const Setting = () => {
  const categories = ['和', '洋', '中'] as const
  const [category, setCategory] = useState<(typeof categories)[number]>('和')

  return (
    <div>
      <h3>カテゴリ</h3>
      <select
        className='select select-bordered w-fit'
        onChange={(e) => {
          const value = e.target.value as (typeof categories)[number]
          setCategory(value)
        }}
      >
        {categories.map((c, i) => (
          <option key={i} selected={category === c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
