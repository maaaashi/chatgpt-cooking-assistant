import { list } from '@vercel/blob'

export async function GET(request: Request) {
  const l = await list()

  console.log(l.blobs)

  return Response.json(l.blobs)
}
