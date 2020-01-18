import { NestFactory } from '@nestjs/core';

import {config} from 'dotenv';
config();

import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './filters/global.exceptions.filter';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionsFilter());
  await app.listen(3000);
}
function setupSwagger(app: INestApplication ) {
  const options = new DocumentBuilder()
    .setTitle('Headless shop API docs')
    .setDescription('Headless shop API docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
bootstrap();
