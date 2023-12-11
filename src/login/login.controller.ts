import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  @Get()
  findOne(@Res({ passthrough: true }) res: Response) {
    res.cookie('refresh_token', 'thisIsRefreshToken', {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    res.cookie('access_token', 'thisIsAccessToken', {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    const login = {
      name: 'Preston',
      department: 'IT',
      division: 'SWE',
    };
    return login;
  }
}
