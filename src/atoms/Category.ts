import { atom } from 'recoil'

export const CategoryAtom = atom<'なし' | '和食' | '洋食' | '中華'>({
  key: 'CategoryState',
  default: 'なし',
})
