import React, { Dispatch, FC, SetStateAction } from 'react'
import { LuLayoutGrid } from 'react-icons/lu'
import { TfiLayoutListThumb } from 'react-icons/tfi'

interface Props {
  mode: 'grid' | 'row'
  setMode: Dispatch<SetStateAction<'grid' | 'row'>>
}

export const Layout: FC<Props> = ({ mode, setMode }) => {
  return (
    <div>
      <button
        className={`btn btn-outline ${mode === 'row' ? 'btn-active' : ''}`}
        onClick={() => setMode('row')}
      >
        <TfiLayoutListThumb />
      </button>
      <button
        className={`btn btn-outline ${mode === 'grid' ? 'btn-active' : ''}`}
        onClick={() => setMode('grid')}
      >
        <LuLayoutGrid />
      </button>
    </div>
  )
}
