import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
} from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleUserRequestType } from './interface/google-user.interface';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from 'src/interceptor/http.interceptor';
import { Request } from 'express';
import { UserEntity } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //----------------Local----------------//
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({
    summary: '로컬 회원 로그인',
    description: '유저를 생성한다.',
  })
  @ApiCreatedResponse({
    description: '유저를 생성한다.',
    type: LoginResponseDTO,
  })
  login(@Req() req: Request): Promise<ApiResponse<LoginResponseDTO>> | any {
    const user = req.user as UserEntity;
    return this.authService.login(user);
  }

  @Post('/signup')
  signup(
    @Body() signupDTO: SignupRequestDTO,
  ): Promise<ApiResponse<SignupResponseDTO>> {
    return this.authService.signup(signupDTO);
  }

  //----------------GOOGLE----------------//
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async authGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: GoogleUserRequestType,
  ): Promise<ApiResponse<LoginResponseDTO>> {
    const { user } = req;

    return await this.authService.loginGoogle(user);
  }

  //----------------KAKAO----------------//
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async authKakao() {}

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: GoogleUserRequestType,
  ): Promise<ApiResponse<LoginResponseDTO>> {
    const { user } = req;

    return await this.authService.loginKakao(user);
  }
}
