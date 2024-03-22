import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
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
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { Request } from 'express';

@Controller('cats')
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {
  constructor(
    private apiConfigService: ApiconfigService,
    private catService: CatsService,
    private readonly logger: Logger, // instantiate logger
  ) {}

  @Public()
  @Get()
  async findAll(@Req() req: Request): Promise<ICat[]> {
    this.logger.debug(`cookeies:  ${req.cookies.access_token}`);
    this.logger.debug(`cookeies:  ${req.cookies.refresh_token}`);

    return this.catService.findAll();
  }
  @Public()
  @Get('verify')
  async verify(@Req() req: Request) {
    this.logger.debug(`cookeies:  ${req.cookies.access_token}`);
    this.logger.debug(`cookeies:  ${req.cookies.refresh_token}`);

    return `Get all cookies`;
  }

  @Public()
  @UseFilters(new HttpExceptionFilter())
  @Get('problem')
  async problem() {
    throw new ConflictException(`Can't find the problem`);
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
