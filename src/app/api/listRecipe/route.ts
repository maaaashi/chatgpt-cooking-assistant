import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(): Promise<NextResponse> {
  const prisma = new PrismaClient()

  const recipes = await prisma.recipe.findMany()

  return NextResponse.json(recipes)
}
