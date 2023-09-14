import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

export const putDB = async (
  title: string,
  recipe: string,
  prompt: string,
  imageUrl: string
) => {
  const prisma = new PrismaClient()
  prisma.recipe.create({
    data: {
      title,
      recipe,
      prompt,
      imageUrl,
    },
  })
}
