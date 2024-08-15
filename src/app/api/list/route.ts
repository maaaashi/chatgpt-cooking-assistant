import { list } from '@vercel/blob'

export async function GET(request: Request) {
  const l = await list()

  return Response.json(l)
}
