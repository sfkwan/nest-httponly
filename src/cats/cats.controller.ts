import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create.cat.dto';

import { Request } from 'express';
import { CatsService } from './cats.service';
import { ICat } from './interface/cats.interface';
import { ApiconfigService } from '../apiconfig/apiconfig.service';

@Controller('cats')
export class CatsController {
  constructor(
    private apiConfigService: ApiconfigService,
    private catService: CatsService,
    private readonly logger: Logger, // instantiate logger
  ) {}

  @Get()
  async findAll(@Req() req: Request): Promise<ICat[]> {
    this.logger.error(`These are all the cats`);
    this.logger.error(JSON.stringify(req.cookies));

    return this.catService.findAll();
  }

  @Post()
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
