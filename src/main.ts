import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Analyze the DTOs and filter the params that will be passed
    transform: true, // Transform the object, like, created_at can be --> createdAt
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  await app.listen(3001);
}

bootstrap();