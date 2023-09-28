import { APIGatewayProxyHandler } from 'aws-lambda'
// @ts-ignore
import { listRecipes } from '/opt/client'

export const handler: APIGatewayProxyHandler = async (req) => {
  let body: string
  try {
    const recipes = await listRecipes()
    body = JSON.stringify({
      recipes,
    })
  } catch (e) {
    console.log(e)
    body = JSON.stringify({
      recipes: [],
    })
  }

  return {
    statusCode: 200,
    body,
  }
}
