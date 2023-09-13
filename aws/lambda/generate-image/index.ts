import { Handler } from 'aws-lambda'
import { Configuration, OpenAIApi } from 'openai'
import { generateAsync } from 'stability-client'
import { put } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

const generateTitle = async (message: string) => {
  const apiKey = process.env.CHATGPT_APIKEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-4'

  const systemContent =
    'Answer the title of the dish in the recipe entered by the user in Japanese.'

  return await openai.createChatCompletion({
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

  return await openai.createChatCompletion({
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
}

const generateImage = async (prompt: string) => {
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

type Input = {
  message: string
}

export const handler: Handler = async (req) => {
  const { message } = JSON.parse(req.body) as Input

  try {
    const response = await generatePrompt(message)
    const content = response.data.choices[0].message?.content!
    const res = await generateTitle(message)
    const title = res.data.choices[0].message?.content!
    const url = await generateImage(content)

    return JSON.stringify({
      url,
      prompt: content,
      title,
    })
  } catch (e) {
    console.log(e)
    return JSON.stringify({
      url: 'error',
      prompt: 'error',
      title: 'error',
    })
  }
}
