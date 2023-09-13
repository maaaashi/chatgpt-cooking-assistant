import { Handler } from 'aws-lambda'
import { Configuration, OpenAIApi } from 'openai'

const postGPT = async (message: string) => {
  const apiKey = process.env.CHATGPT_APIKEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-4'

  const systemContent = `ユーザーが料理のレシピを求めてきます。markdown形式で回答してください。`

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

type Input = {
  message: string
}

export const handler: Handler = async (req) => {
  const { message } = JSON.parse(req.body) as Input

  try {
    const response = await postGPT(message)
    const recipe = response.data.choices[0].message?.content!

    const res = await fetch(process.env.GENERATE_IMAGE_URL!, {
      method: 'POST',
      body: JSON.stringify({
        message: recipe,
      }),
    })

    const { url, prompt, title } = await res.json()

    return JSON.stringify({
      recipe,
      imageUrl: url,
      prompt,
      title,
    })
  } catch (e) {
    console.log(e)
    return JSON.stringify({
      recipe: 'ERROR',
      imageUrl: 'ERROR',
    })
  }
}
