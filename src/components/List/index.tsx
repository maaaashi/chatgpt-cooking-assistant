import React from 'react'

export const List = () => {
  return (
    <>
      {[0].map((l, i) => {
        return (
          <img
            src='https://unqinjwlxwla3i0v.public.blob.vercel-storage.com/57afb63f-c1ff-4c57-a10b-586c171f995a-9wRv7Bh22tO4ztgMsrNjnatIAdKfiO'
            key={i}
          />
        )
      })}
    </>
  )
}
