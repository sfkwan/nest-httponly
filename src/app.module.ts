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
import { WinstonModule } from 'nest-winston';
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
    WinstonModule.forRoot(loggerConfig),

    ApiconfigModule,
    CatsModule,
    LoginModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleLoggerMiddleware).forRoutes('*');
  }
}
