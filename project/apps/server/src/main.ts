/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { BasePrismaService } from './app/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .enableCors
    //   {
    //   allowedHeaders: '*',
    //   origin: '*',
    //   credentials: true,
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   preflightContinue: false,
    // }
    ();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  const prismaService = app.get(BasePrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
