import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib'
import {
  Code,
  Function,
  FunctionUrlAuthType,
  HttpMethod,
  Runtime,
} from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'
import path = require('path')

export class MaaaashiCookingAssistant extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const generateImageLambda = new Function(
      this,
      'CookingAssistantGenerateImage',
      {
        functionName: 'CookingAssistantGenerateImage',
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset(path.join(__dirname, '../lambda/generate-image/')),
        handler: 'index.handler',
        environment: {
          CHATGPT_APIKEY: process.env.CHATGPT_APIKEY!,
          DREAM_STUDIO_APIKEY: process.env.DREAM_STUDIO_APIKEY!,
        },
        timeout: Duration.minutes(15),
      }
    )

    const generateImageFunctionURL = generateImageLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedMethods: [HttpMethod.POST],
        allowedOrigins: ['*'],
      },
    })

    const generateRecipeLambda = new Function(
      this,
      'CookingAssistantGenerateRecipe',
      {
        functionName: 'CookingAssistantGenerateRecipe',
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset(
          path.join(__dirname, '../lambda/generate-recipe/')
        ),
        handler: 'index.handler',
        environment: {
          CHATGPT_APIKEY: process.env.CHATGPT_APIKEY!,
          GENERATE_IMAGE_URL: generateImageFunctionURL.url,
        },
        timeout: Duration.minutes(15),
      }
    )

    const generateRecipeFunctionURL = generateRecipeLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedMethods: [HttpMethod.POST],
        allowedOrigins: ['*'],
      },
    })

    new CfnOutput(this, 'GenerateRecipeURL', {
      value: generateRecipeFunctionURL.url,
    })
    new CfnOutput(this, 'GenerateImageURL', {
      value: generateImageFunctionURL.url,
    })
  }
}
