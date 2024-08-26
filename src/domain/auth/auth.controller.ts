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
import { RefreshAccessTokenResponseDTO } from './dto/jwt-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //----------------JWT----------------//
  @Post('/refresh')
  @UseGuards(AuthGuard('refresh'))
  @ApiOperation({ description: '토큰 재발급' })
  async refreshToken(
    @Req() req: Request,
  ): Promise<ApiResponse<RefreshAccessTokenResponseDTO>> {
    const refreshToken = req.cookies.refreshToken;
    return this.authService.refreshAccessToken(refreshToken);
  }

  //----------------Local----------------//
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({
    summary: '로컬 회원 로그인',
    description: '유저 로그인 합니다.',
  })
  @ApiCreatedResponse({
    description: '유저를 로그인 합니다',
    type: LoginResponseDTO,
  })
  async login(@Req() req: Request): Promise<ApiResponse<LoginResponseDTO>> {
    const user = req.user as UserEntity;

    const result = await this.authService.login(user);

    return result;
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
