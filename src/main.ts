import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });
  // app.enableCors({
  //   origin: ['http://localhost:3000', 'http://localhost:3001'],
  //   credentials: true,
  //   // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // });
  app.use(cookieParser());
  await app.listen(3010);
}
bootstrap();
