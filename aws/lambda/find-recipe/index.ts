import { Handler } from 'aws-lambda'
// @ts-ignore
import { findRecipe } from '/opt/client'

interface Input {
  id: number
}

export const handler: Handler = async (req) => {
  console.log(req)
  const { id } = req.queryStringParameters as Input
  try {
    const recipe = await findRecipe(id)
    return JSON.stringify({
      recipe,
    })
  } catch (e) {
    console.log(e)
    return JSON.stringify({
      recipe: null,
    })
  }
}
