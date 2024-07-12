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
import { LoginRequestDTO, OauthLoginRequestDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guard/google-auth.guard';

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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async authGoogle(@Req() req: Request) {
    console.log('GET google/login - googleAuth 실행');
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async loginGoogle(@Req() req: Request, @Res() res: Response) {
    console.log('GET oauth2/redirect/google - googleAuthRedirect 실행');

    // const { user } = req;
    // return this.authService.loginWithGoogle(body);
  }

  // @Post('/kakao')
  // loginWithKakao(@Body() body: OauthLoginRequestDTO) {
  //   return this.authService.loginWithGoogle(body);
  // }
}
