import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
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
  async findAll(): Promise<ICat[]> {
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
