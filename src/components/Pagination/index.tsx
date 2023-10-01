import React, { FC } from 'react'

interface Props {
  array: any[]
  clickFunc: Function
  now: number
}

export const Pagination: FC<Props> = ({ array, clickFunc, now }) => {
  const first = 1
  const last = Math.floor(array.length / 10 + 1)
  let before_2 = now - 2 < 1 ? 0 : now - 2
  let before_1 = now - 1 < 1 ? 0 : now - 1
  let after_1 = last < now + 1 ? 0 : now + 1
  let after_2 = last < now + 2 ? 0 : now + 2

  let pagination: (string | number)[] = [
    before_2,
    before_1,
    now,
    after_1,
    after_2,
  ].filter((c) => c !== 0)

  if (pagination.findIndex((c) => c === first) === -1) {
    pagination = [1, '・・・', ...pagination]
  }

  if (pagination.findIndex((c) => c === last) === -1) {
    pagination = [...pagination, '・・・', last]
  }

  return (
    <div className='join'>
      {pagination.map((p, i) => {
        if (p === '・・・')
          return (
            <button className='join-item btn pointer-events-none' key={i}>
              {p}
            </button>
          )

        if (p === before_2 || p === after_2) {
          return (
            <button
              className='join-item btn hidden md:block'
              key={i}
              onClick={() => clickFunc(p)}
            >
              {p}
            </button>
          )
        }

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
  const mobilePagination = () => {}

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
