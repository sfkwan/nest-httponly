import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { instance } from './logger/winston.logger';
import helmet from 'helmet';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./cert.key'),
    cert: fs.readFileSync('./cert.crt'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    bufferLogs: true,
    // logger: WinstonModule.createLogger({ instance }),
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  console.log();
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3001',
      'http://web-prkwan.bochk.com:3000',
    ],
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  const hostname = configService.get('HOSTNAME') || 'localhost';
  await app.listen(3010, hostname);
}
bootstrap();
