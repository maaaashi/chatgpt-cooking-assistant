import { atom } from 'recoil'

export const LoadingAtom = atom<boolean>({
  key: 'LoadingState',
  default: false,
})
