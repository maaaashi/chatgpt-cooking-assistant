#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { MaaaashiCookingAssistant } from '../lib/aws-stack'

const app = new cdk.App()
new MaaaashiCookingAssistant(app, 'MaaaashiCookingAssistant')
