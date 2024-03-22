import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  @Get()
  findOne(@Res({ passthrough: true }) res: Response) {
    res.cookie('refresh-token', 'thisIsRefreshToken', {
      expires: new Date(Date.now() + 120000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/oidc/refresh-tokens',
    });

    res.cookie('access-token', `${new Date().getTime() / 1000}`, {
      expires: new Date(Date.now() + 120000),
      httpOnly: true,
      sameSite: 'none',
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
