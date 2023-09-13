import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const putVercelDB = async (
  recipe: string,
  imageUrl: string,
  prompt: string,
  title: string
) => {
  try {
    const prisma = new PrismaClient()
    await prisma.recipe.create({
      data: {
        recipe,
        imageUrl,
        prompt,
        title,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export async function POST(event: NextRequest): Promise<NextResponse> {
  const { recipe, imageUrl, prompt, title } = await event.json()

  await putVercelDB(recipe, imageUrl, prompt, title)

  return NextResponse.json({})
}
