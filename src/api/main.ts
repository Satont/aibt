/* eslint-disable import/prefer-default-export */
import 'reflect-metadata';
import 'source-map-support/register';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export const apiLogger = new Logger('API');
let app: NestFastifyApplication;
const PORT = process.env.PORT ?? 3000;

export async function bootstrap() {
  try {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger: apiLogger });

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
   /*  const config = new DocumentBuilder()
      .setTitle('AIBT API')
      .setDescription('Avaliable Riddea API endpoints')
      .setVersion(process.env.npm_version ?? '3.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document, {
      customSiteTitle: 'API Docs',
    }); */

    await app.listen(PORT, '0.0.0.0');
  } catch (err) {
    apiLogger.error('API main error', err.stack);
  }
}

process.on('SIGTERM', () => app.close());
process.on('SIGINT', () => app.close());
