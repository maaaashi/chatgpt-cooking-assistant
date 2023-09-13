import { Recipe } from '@/domains/recipe'
import { atom } from 'recoil'

export const SelectRecipeAtom = atom<Recipe | undefined>({
  key: 'SelectRecipeState',
  default: undefined,
})
