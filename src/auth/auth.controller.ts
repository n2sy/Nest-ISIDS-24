import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSer: AuthService) {}

  @Post('signup')
  async inscription(@Body() Body, @Res() response: Response) {
    let result = await this.authSer.signup(Body);
    return response.json(result);
  }
  @Post('signin')
  async login(@Body() Body, @Res() response: Response) {
    let result = await this.authSer.signin(Body);
    return response.json(result);
  }
}
