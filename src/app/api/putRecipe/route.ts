import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const putVercelDB = async (
  recipe: string,
  imageUrl: string,
  prompt: string
) => {
  try {
    const prisma = new PrismaClient()
    await prisma.recipe.create({
      data: {
        recipe,
        imageUrl,
        prompt,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export async function POST(event: NextRequest): Promise<NextResponse> {
  const { recipe, imageUrl, prompt } = await event.json()

  await putVercelDB(recipe, imageUrl, prompt)

  return NextResponse.json({})
}
