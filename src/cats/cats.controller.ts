import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create.cat.dto';

import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return createCatDto;
  }
  @Get()
  findAll(@Req() req: Request): CreateCatDto {
    console.log(req.cookies);

    const cat: CreateCatDto = {
      name: 'Chewie',
      age: 10,
      breed: 'Golden Retriever',
    };
    return cat;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return a cat with ${id}`;
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
