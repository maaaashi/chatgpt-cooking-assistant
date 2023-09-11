import { Handler } from 'aws-lambda'
import { Configuration, OpenAIApi } from 'openai'

const postGPT = async (message: string) => {
  const apiKey = process.env.CHATGPT_APIKEY
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)
  const model = 'gpt-4'

  const systemContent = ``

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
        content: ``,
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
    const content = response.data.choices[0].message?.content!

    return JSON.stringify({
      content,
    })
  } catch (e) {
    console.log(e)
    return JSON.stringify({
      content: 'ERROR',
    })
  }
}
