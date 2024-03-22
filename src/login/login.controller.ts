import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  @Get()
  findOne(@Res({ passthrough: true }) res: Response) {
    res.cookie('refresh_token', 'verify', {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/verify',
    });

    res.cookie('access_token', 'verify', {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/verify',
    });

    const login = {
      name: 'Preston',
      department: 'IT',
      division: 'SWE',
    };
    return login;
  }
}
