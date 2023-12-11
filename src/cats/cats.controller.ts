import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create.cat.dto';

import { Request, Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(
    @Body() createCatDto: CreateCatDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('rememberme', createCatDto.name, {
      expires: new Date(Date.now() + 900000),
      // httpOnly: true,
      // sameSite: 'lax',
      // secure: true,
    });
    return createCatDto;
  }
  @Get()
  findAll(@Req() req: Request): CreateCatDto {
    const cookie = req.cookies['rememberme'];
    console.log(cookie);

    console.log(req.cookies);

    const cat = {
      name: 'Preston',
      age: 10,
      breed: 'Chicken',
    };
    return cat;
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    res.cookie('rememberme', id, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      //domain: 'http://localhost:3010',
    });

    res.cookie('access_token', 'eadsad.asdfa.asddas', {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    const cat = {
      name: 'Preston',
      age: 10,
      breed: 'Chicken',
    };
    return cat;
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
