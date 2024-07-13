import { Injectable } from '@nestjs/common';
import { LoginRequestDTO } from './dto/auth.dto';
import { GoogleUserType } from './interface/google.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(body: LoginRequestDTO) {
    const { email, password } = body;
    try {
      const user = this.userService.findUserByEmail(email);

      if (!user) {
        //에러
        return false;
      }

      
    } catch (error) {}
  }

  signup() {
    return 'signup';
  }

  async loginWithGoogle(user: GoogleUserType) {
    try {
      const findUser = await this.userService.findUserByEmail(user.email);
    } catch (error) {}
  }
}
