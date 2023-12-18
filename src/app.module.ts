import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiconfigModule } from './apiconfig/apiconfig.module';
import { CatsModule } from './cats/cats.module';
import { LoginModule } from './login/login.module';
import { SimpleLoggerMiddleware } from './middleware/simple-logger.middleware';

@Module({
  imports: [ApiconfigModule, CatsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleLoggerMiddleware).forRoutes('*');
  }
}
