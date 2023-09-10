import { Ingredient } from '@/domains/ingredient'
import { atom } from 'recoil'

export const IngredientsAtom = atom<Ingredient[]>({
  key: 'ingredientState',
  default: [],
})
