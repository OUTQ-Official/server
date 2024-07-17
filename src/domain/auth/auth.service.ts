import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  SignupRequestDTO,
} from './dto/auth.dto';
import { GoogleUserType } from './interface/google-user.interface';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import RES_MSG from 'src/constant/res-msg';
import { ApiResponse } from 'src/interceptor/api.-response.interceptor';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(loginDTO: LoginRequestDTO) {
    const { email, password } = loginDTO;

    try {
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new HttpException(RES_MSG.AUTH.NOT_EXIST, HttpStatus.BAD_REQUEST);
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (isMatch) {
        console.log('hello');
      }
    } catch (error) {
      throw new HttpException(
        RES_MSG.SERVER.UNKNOWN,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signup(signupDTO: SignupRequestDTO) {
    try {
      const user = await this.userService.findUserByEmail(signupDTO.email);

      if (user) {
        throw new HttpException(
          RES_MSG.AUTH.ALREADY_EXIST,
          HttpStatus.BAD_REQUEST,
        );
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
