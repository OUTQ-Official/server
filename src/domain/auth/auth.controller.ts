import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/auth.dto';

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

  password() {}
}
