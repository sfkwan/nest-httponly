import { Global, Module } from '@nestjs/common';
import { ApiconfigService } from './apiconfig.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ApiconfigService],
  exports: [ApiconfigService],
})
export class ApiconfigModule {}
