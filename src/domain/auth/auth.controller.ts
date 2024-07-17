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
import {
  LoginRequestDTO,
  LoginResponseDTO,
  SignupRequestDTO,
} from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleUserRequestType } from './interface/google-user.interface';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //----------------Local----------------//
  @Post('/login')
  @ApiOperation({
    summary: '로컬 회원 로그인',
    description: '유저를 생성한다.',
  })
  @ApiCreatedResponse({
    description: '유저를 생성한다.',
    type: LoginResponseDTO,
  })
  login(@Body() loginDTO: LoginRequestDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('/signup')
  signup(@Body() signupDTO: SignupRequestDTO) {
    return this.authService.signup(signupDTO);
  }

  //----------------GOOGLE----------------//
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async authGoogle(@Req() req: Request) {
    console.log(req);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: GoogleUserRequestType, @Res() res: Response) {
    const { user } = req;

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
