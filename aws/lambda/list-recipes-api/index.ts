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
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,GET',
    },
    body,
  }
}
