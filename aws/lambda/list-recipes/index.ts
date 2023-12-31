import { Handler } from 'aws-lambda'
// @ts-ignore
import { listRecipes } from '/opt/client'

export const handler: Handler = async (req) => {
  try {
    const recipes = await listRecipes()
    return JSON.stringify({
      recipes,
    })
  } catch (e) {
    console.log(e)
    return JSON.stringify({
      recipes: [],
    })
  }
}
