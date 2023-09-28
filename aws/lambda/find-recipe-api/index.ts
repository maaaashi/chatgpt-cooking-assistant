import { APIGatewayProxyHandler } from 'aws-lambda'
// @ts-ignore
import { findRecipe } from '/opt/client'

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log(event)
  let body: string

  try {
    const id = event.queryStringParameters!.id!
    const recipe = await findRecipe(+id)
    body = JSON.stringify({
      recipe,
    })
  } catch (e) {
    console.log(e)
    body = JSON.stringify({
      recipe: null,
    })
  }

  return {
    statusCode: 200,
    body,
  }
}
