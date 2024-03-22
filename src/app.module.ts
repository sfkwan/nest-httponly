import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiconfigModule } from './apiconfig/apiconfig.module';
import { CatsModule } from './cats/cats.module';
import { LoginModule } from './login/login.module';
import { SimpleLoggerMiddleware } from './middleware/simple-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClsModule } from 'nestjs-cls';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule, utilities } from 'nest-winston';
import { instance } from './logger/winston.logger';
import winston from 'winston';
import { loggerConfig } from './logger/winston.config';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req: Request) => {
          cls.set('x-request-id', req.headers['x-request-id']);
        },
      },
    }),

    WinstonModule.forRootAsync({
      useFactory: ()=> {      {transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
          ),
        }),
      ]}},

    
    ApiconfigModule,
    CatsModule,
    LoginModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // , Logger
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleLoggerMiddleware).forRoutes('*');
  }
}
