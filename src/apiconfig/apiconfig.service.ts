import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiconfigService {
  constructor(private configService: ConfigService) {}

  get isAuthEnabled(): string {
    return this.configService.get('HOSTNAME');
  }

  get hostName(): string {
    return this.configService.get('HOSTNAME');
  }

  get port(): string {
    return this.configService.get('PORT');
  }
}
