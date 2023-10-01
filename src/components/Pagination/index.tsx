import React, { FC } from 'react'

interface Props {
  array: any[]
  clickFunc: Function
  now: number
}

export const Pagination: FC<Props> = ({ array, clickFunc, now }) => {
  const mobilePagination = () => {
    const last = Math.floor(array.length / 10 + 1)
    let before_2 = now - 2 < 1 ? 0 : now - 2
    let before_1 = now - 1 < 1 ? 0 : now - 1
    let after_1 = last < now + 1 ? 0 : now + 1
    let after_2 = last < now + 2 ? 0 : now + 2

    const pagination = [before_2, before_1, now, after_1, after_2]

    return (
      <div className='join md:hidden'>
        {pagination.map((p, i) => {
          if (p === 0) return <></>

          return (
            <button
              className={`join-item btn ${p === now ? 'btn-active' : ''}`}
              key={i}
              onClick={() => clickFunc(p)}
            >
              {p}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <>
      {mobilePagination()}
      <div className='join hidden md:block'>
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
    </>
  )
}
