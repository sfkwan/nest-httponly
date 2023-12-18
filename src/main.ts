import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { instance } from './logger/winston.logger';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./cert.key'),
    cert: fs.readFileSync('./cert.crt'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: WinstonModule.createLogger({ instance }),
  });

  console.log();
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
  });
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  const hostname = configService.get('HOSTNAME') || 'localhost';
  await app.listen(3010, hostname);
}
bootstrap();
