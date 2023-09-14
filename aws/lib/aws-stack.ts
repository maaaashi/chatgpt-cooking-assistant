import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib'
import {
  Code,
  Function,
  FunctionUrlAuthType,
  HttpMethod,
  LayerVersion,
  Runtime,
} from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'
import path = require('path')

export class MaaaashiCookingAssistant extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const prismaLayer = new LayerVersion(this, 'PrismaLayer', {
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      description: 'Prisma Layer',
      code: Code.fromAsset(path.join(__dirname, '../layer/prisma/nodejs/'), {
        bundling: {
          image: Runtime.NODEJS_18_X.bundlingImage,
          command: [
            'bash',
            '-c',
            [
              'cp package.json package-lock.json client.js /asset-output',
              'cp -r prisma /asset-output/prisma',
              'cp -r node_modules /asset-output/node_modules',
              'rm -rf /asset-output/node_modules/.cache',
              'rm -rf /asset-output/node_modules/.prisma/client/*darwin*' ||
                true,
              'rm -rf /asset-output/node_modules/.prisma/client/*windows*' ||
                true,
              'rm -rf /asset-output/node_modules/@prisma/engines/node_modules',
              'rm -r /asset-output/node_modules/@prisma/engines/*darwin* || true',
              'rm -r /asset-output/node_modules/@prisma/engines/*debian* || true',
              'rm -f /asset-output/node_modules/prisma/*darwin* || true',
              'rm -f /asset-output/node_modules/prisma/*debian* || true',
              'rm -f /asset-output/node_modules/prisma/*windows* || true',
              'npx prisma generate',
            ].join(' && '),
          ],
        },
      }),
      layerVersionName: 'prisma-layer',
    })

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
          BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN!,
          POSTGRES_DATABASE: process.env.POSTGRES_DATABASE!,
          POSTGRES_HOST: process.env.POSTGRES_HOST!,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
          POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL!,
          POSTGRES_URL: process.env.POSTGRES_URL!,
          POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING!,
          POSTGRES_USER: process.env.POSTGRES_USER!,
        },
        timeout: Duration.minutes(15),
        layers: [prismaLayer],
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
