import { Handler } from 'aws-lambda'
import { listDB } from '/opt/client'

export const handler: Handler = async (req) => {
  try {
    const recipes = await listDB()
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
