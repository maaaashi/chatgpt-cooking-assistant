import { PrismaClient } from '@prisma/client'

export const putDB = async (
  title: string,
  recipe: string,
  prompt: string,
  imageUrl: string
) => {
  const prisma = new PrismaClient()
  await prisma.recipe.create({
    data: {
      title,
      recipe,
      prompt,
      imageUrl,
    },
  })
}

export const listRecipes = async () => {
  const prisma = new PrismaClient()
  return await prisma.recipe.findMany()
}

export const findRecipe = async (id: number) => {
  const prisma = new PrismaClient()
  return await prisma.recipe.find({
    where: { id },
  })
}
