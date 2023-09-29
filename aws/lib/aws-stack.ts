import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib'
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
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
      code: Code.fromAsset(path.join(__dirname, '../layer/prisma')),
      layerVersionName: 'prisma-layer',
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

    const generateRecipeFunctionURL = generateRecipeLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedMethods: [HttpMethod.POST],
        allowedOrigins: ['*'],
      },
    })

    const listRecipesLambda = new Function(
      this,
      'CookingAssistantListRecipes',
      {
        functionName: 'CookingAssistantListRecipes',
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset(path.join(__dirname, '../lambda/list-recipes/')),
        handler: 'index.handler',
        timeout: Duration.minutes(15),
        environment: {
          POSTGRES_DATABASE: process.env.POSTGRES_DATABASE!,
          POSTGRES_HOST: process.env.POSTGRES_HOST!,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
          POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL!,
          POSTGRES_URL: process.env.POSTGRES_URL!,
          POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING!,
          POSTGRES_USER: process.env.POSTGRES_USER!,
        },
        layers: [prismaLayer],
      }
    )

    const listRecipesFunctionURL = listRecipesLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedMethods: [HttpMethod.GET],
        allowedOrigins: ['*'],
      },
    })

    const findRecipeLambda = new Function(this, 'CookingAssistantFindRecipe', {
      functionName: 'CookingAssistantFindRecipe',
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(path.join(__dirname, '../lambda/find-recipe/')),
      handler: 'index.handler',
      timeout: Duration.minutes(15),
      environment: {
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE!,
        POSTGRES_HOST: process.env.POSTGRES_HOST!,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL!,
        POSTGRES_URL: process.env.POSTGRES_URL!,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING!,
        POSTGRES_USER: process.env.POSTGRES_USER!,
      },
      layers: [prismaLayer],
    })

    const findRecipeFunctionURL = findRecipeLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedMethods: [HttpMethod.GET],
        allowedOrigins: ['*'],
      },
    })

    new CfnOutput(this, 'GenerateRecipeURL', {
      value: generateRecipeFunctionURL.url,
    })
    new CfnOutput(this, 'ListRecipesURL', {
      value: listRecipesFunctionURL.url,
    })
    new CfnOutput(this, 'FindRecipeURL', {
      value: findRecipeFunctionURL.url,
    })

    // API Gateway の定義
    const api = new RestApi(this, 'CookingAssistantApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    })

    const listRecipesApiLambda = new Function(
      this,
      'CookingAssistantListRecipesApi',
      {
        functionName: 'CookingAssistantListRecipesApi',
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset(
          path.join(__dirname, '../lambda/list-recipes-api/')
        ),
        handler: 'index.handler',
        timeout: Duration.minutes(15),
        environment: {
          POSTGRES_DATABASE: process.env.POSTGRES_DATABASE!,
          POSTGRES_HOST: process.env.POSTGRES_HOST!,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
          POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL!,
          POSTGRES_URL: process.env.POSTGRES_URL!,
          POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING!,
          POSTGRES_USER: process.env.POSTGRES_USER!,
        },
        layers: [prismaLayer],
      }
    )

    const findRecipeApiLambda = new Function(
      this,
      'CookingAssistantFindRecipeApi',
      {
        functionName: 'CookingAssistantFindRecipeApi',
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset(
          path.join(__dirname, '../lambda/find-recipe-api/')
        ),
        handler: 'index.handler',
        timeout: Duration.minutes(15),
        environment: {
          POSTGRES_DATABASE: process.env.POSTGRES_DATABASE!,
          POSTGRES_HOST: process.env.POSTGRES_HOST!,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
          POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL!,
          POSTGRES_URL: process.env.POSTGRES_URL!,
          POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING!,
          POSTGRES_USER: process.env.POSTGRES_USER!,
        },
        layers: [prismaLayer],
      }
    )

    const generateRecipeApiLambda = new Function(
      this,
      'CookingAssistantGenerateRecipeApi',
      {
        functionName: 'CookingAssistantGenerateRecipeApi',
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset(
          path.join(__dirname, '../lambda/generate-recipe-api/')
        ),
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

    const generateRecipeResource = api.root.addResource('generateRecipe')
    generateRecipeResource.addMethod(
      'POST',
      new LambdaIntegration(generateRecipeApiLambda)
    )

    const findRecipeResource = api.root.addResource('findRecipe')
    findRecipeResource.addMethod(
      'GET',
      new LambdaIntegration(findRecipeApiLambda)
    )

    const listRecipesResource = api.root.addResource('listRecipes')
    listRecipesResource.addMethod(
      'GET',
      new LambdaIntegration(listRecipesApiLambda)
    )

    new CfnOutput(this, 'API Gateway URL', {
      value: api.url,
    })
  }
}
