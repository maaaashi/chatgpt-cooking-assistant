import React, { FC } from 'react'

interface Props {
  array: any[]
  clickFunc: Function
  now: number
}

export const Pagination: FC<Props> = ({ array, clickFunc, now }) => {
  return (
    <div className='join'>
      {[...Array(Math.floor(array.length / 10 + 1))].map((_, i) => {
        const page = i + 1
        return (
          <button
            className={`join-item btn ${page === now ? 'btn-active' : ''}`}
            key={i}
            onClick={() => clickFunc(page)}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}
