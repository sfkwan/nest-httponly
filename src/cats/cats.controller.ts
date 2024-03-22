import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  LoggerService,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create.cat.dto';

import { CatsService } from './cats.service';
import { ICat } from './interface/cats.interface';
import { ApiconfigService } from '../apiconfig/apiconfig.service';
import { Public } from '../auth/meta/publicMeta';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/meta/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('cats')
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {
  constructor(
    private readonly cls: ClsService,
    private apiConfigService: ApiconfigService,
    private catService: CatsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService, // instantiate logger
  ) {}

  @Public()
  @Get()
  async findAll(@Req() req: Request): Promise<ICat[]> {
    const xRequestId = this.cls.get('x-request-id');
    this.logger.log({
      'Access token': req.cookies['access-token'],
      'x-request-id': xRequestId,
    });
    return this.catService.findAll();
  }

  @Post()
  @Roles(['admin'])
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return a cat with ${id} ${this.apiConfigService.port} ${this.apiConfigService.hostName}`;
  }

  @Put(':id')
  updateOne(@Param('id') id: string) {
    return `This action update a cat with ${id}`;
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return `This action delete a cat with ${id}`;
  }
}
