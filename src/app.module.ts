import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiconfigModule } from './apiconfig/apiconfig.module';
import { CatsModule } from './cats/cats.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ApiconfigModule, CatsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
