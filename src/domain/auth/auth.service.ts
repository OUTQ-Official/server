import { Injectable } from '@nestjs/common';
import { LoginRequestDTO, SignupRequestDTO } from './dto/auth.dto';
import { GoogleUserType } from './interface/google-user.interface';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(loginDTO: LoginRequestDTO) {
    const { email, password } = loginDTO;

    try {
      const user = await this.userService.findUserByEmail(email);
      console.log(user);

      const isMatch = bcrypt.compare(password, user.password);

      if (isMatch) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async signup(signupDTO: SignupRequestDTO) {
    try {
      const user = await this.userService.findUserByEmail(signupDTO.email);

      if (user) {
        return '이미 가입한 회원';
      }

      const newUser = await this.userService.createUser({
        ...signupDTO,
        id: `테스트 아이디${Math.random()}`,
        signupAt: new Date(),
        refreshToken: `Test Token${Math.random()}`,
        boards: [],
      });

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithGoogle(googleUser: GoogleUserType) {
    try {
      const user = await this.userService.findUserByEmail(googleUser.email);

      if (!user) {
        const newUser = await this.userService.createUser({
          ...googleUser,
          id: `테스트 아이디${Math.random()}`,
          password: 'google',
          signupAt: new Date(),
          refreshToken: `Test Token${Math.random()}`,
          boards: [],
        });

        return newUser;
      }
    } catch (error) {}
  }
}
