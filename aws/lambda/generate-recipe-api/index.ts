import { APIGatewayProxyHandler } from 'aws-lambda'
import { Configuration, OpenAIApi } from 'openai'
import { put } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'
import { generateAsync } from 'stability-client'
// @ts-ignore
import { putDB } from '/opt/client'

const generateTitle = async (message: string): Promise<string> => {
  const apiKey = process.env.CHATGPT_APIKEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-4'

  const systemContent =
    'Answer the title of the dish in the recipe entered by the user in Japanese.'

  const response = await openai.createChatCompletion({
    model,
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  })

  return response.data.choices[0].message?.content!
}

const generatePrompt = async (message: string) => {
  const apiKey = process.env.CHATGPT_APIKEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-4'

  const systemContent = `
Please come up with an English prompt to draw the user's desired picture using the image generation AI.

The prompt guide is as follows

1. **Basics of Prompt Engineering**
  - Prompt engineering involves using words to instruct image generation in the world of AI art.
  - Core Prompt: Concisely describes the central theme or subject (e.g., Panda, a warrior with a sword).
  - Style: Specifies the style of the prompt (e.g., Realistic, Oil painting, Pencil drawing, Concept art).

2. **Using Artists**
  - You can add an artist's name to the prompt to emulate a specific artist's style (e.g., in the style of Picasso).

3. **Finishing Touches**
  - Instructions to add additional elements or specific characteristics to the image. Examples include: Detailed, Surrealism, Trending on ArtStation, etc.

4. **Prompt Weighting**
  - A technique to increase or decrease the intensity of specific elements in an image. For instance, to modulate the strength of certain colors or objects.

5. **Negative Prompting**
  - A technique to specify elements you don't want to be generated. For example, to exclude deformed hands or too many fingers.

According to the guide, prompt engineering can significantly improve the quality and composition of the generated images.
`

  const response = await openai.createChatCompletion({
    model,
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  })
  return response.data.choices[0].message?.content!
}

const generateImage = async (recipe: string) => {
  const prompt = await generatePrompt(recipe)
  try {
    // @ts-ignore
    const { images } = await generateAsync({
      prompt,
      apiKey: process.env.DREAM_STUDIO_APIKEY!,
      noStore: true,
      steps: 50,
    })

    const arrayBuffer = images[0].buffer as ArrayBuffer

    const blob = await put(uuidv4(), arrayBuffer, {
      access: 'public',
    })

    return blob.url
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

const generateRecipe = async (message: string, temperature?: number) => {
  const apiKey = process.env.CHATGPT_APIKEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-4'

  const systemContent = `ユーザーが料理のレシピを求めてきます。markdown形式で回答してください。情報が足りない場合はERRORとだけ返してください。`

  const response = await openai.createChatCompletion({
    model,
    temperature: temperature ?? 1,
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  })

  return response.data.choices[0].message?.content!
}

type Input = {
  message: string
  temprature?: number
}

export const handler: APIGatewayProxyHandler = async (req) => {
  const { message, temprature } = JSON.parse(req.body!) as Input
  let body: string

  try {
    const recipe = await generateRecipe(message, temprature)

    if (recipe === 'ERROR') {
      body = JSON.stringify({
        recipe: 'ERROR',
        imageUrl: 'ERROR',
        prompt: 'ERROR',
        title: 'ERROR',
      })

      return {
        statusCode: 200,
        body,
      }
    }

    const [title, url] = await Promise.all([
      generateTitle(recipe),
      generateImage(recipe),
    ])

    const { id } = await putDB(title, recipe, message, url)

    body = JSON.stringify({
      id,
      recipe,
      imageUrl: url,
      prompt: message,
      title,
    })
  } catch (e) {
    console.log(e)
    body = JSON.stringify({
      recipe: 'ERROR',
      imageUrl: 'ERROR',
    })
  }

  return {
    statusCode: 200,
    body,
  }
}
