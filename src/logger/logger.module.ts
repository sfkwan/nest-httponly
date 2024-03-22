import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

@Module({ imports: [WinstonModule.forRootAsync({})] })
export class LoggerModule {}
