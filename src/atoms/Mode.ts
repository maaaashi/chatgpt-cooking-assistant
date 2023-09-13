import { atom } from 'recoil'

export const ModeAtom = atom<'generate' | 'list' | 'view'>({
  key: 'ModeState',
  default: 'generate',
})
