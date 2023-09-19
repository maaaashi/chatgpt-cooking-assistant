import { LoadingAtom } from '@/atoms/Loading'
import React, { FC, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  children: ReactNode
  clickFunc: () => void
}

const HeaderButton: FC<Props> = ({ children, clickFunc }) => {
  const loading = useRecoilValue(LoadingAtom)
  return (
    <button
      className='btn btn-outline btn-info flex-col'
      onClick={clickFunc}
      disabled={loading}
    >
      {children}
    </button>
  )
}

export default HeaderButton
