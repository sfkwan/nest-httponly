import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { LoginController } from './login/login.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, LoginController],
  providers: [AppService],
})
export class AppModule {}
