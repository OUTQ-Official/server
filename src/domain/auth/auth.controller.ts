import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { Request, Response } from 'express';
import { GoogleRequest } from './interface/google.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginRequestDTO) {
    return this.authService.login(body);
  }

  @Post('/signup')
  signup() {
    return this.authService.signup();
  }

  //----------------GOOGLE----------------//
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async authGoogle(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: GoogleRequest, @Res() res: Response) {
    const { user } = req;

    console.log(user.email, user.username);

    if (user) {
      res.redirect('http://localhost:3000');
    } else {
      res.redirect('http://localhost:3000/login');
    }

    return this.authService.loginWithGoogle(user);
    // return this.authService.loginWithGoogle(body);
  }

  // @Post('/kakao')
  // loginWithKakao(@Body() body: OauthLoginRequestDTO) {
  //   return this.authService.loginWithGoogle(body);
  // }
}
