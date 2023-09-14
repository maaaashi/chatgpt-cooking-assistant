import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sql } from '@vercel/postgres'

// export async function GET(): Promise<NextResponse> {
//   const prisma = new PrismaClient()

//   const recipes = await prisma.recipe.findMany()

//   return NextResponse.json(recipes)
// }

export async function GET(): Promise<NextResponse> {
  // const prisma = new PrismaClient()

  // const recipes = await prisma.recipe.findMany()
  const { rows } = await sql`SELECT * FROM Recipe`
  console.log(rows)
  return NextResponse.json({ recipes: rows })
}
