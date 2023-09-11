import { atom } from 'recoil'

export const CategoryAtom = atom<'なし' | '和' | '洋' | '中'>({
  key: 'CategoryState',
  default: 'なし',
})
