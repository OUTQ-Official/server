import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
} from './dto/auth.dto';
import { GoogleUserType } from './interface/google-user.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import RES_MSG from 'src/constant/res-msg';
import {
  ApiResponse,
  errorHandler,
  success,
} from 'src/interceptor/http.interceptor';

import { UserEntity } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // // ###### JWT ######
  signAccessToken(user: UserEntity) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  // ###### Local ######
  async validateUser(loginDTO: LoginRequestDTO): Promise<UserEntity | null> {
    try {
      const user = await this.userService.findUserByEmail(loginDTO.email);

      if (!user) {
        throw new HttpException(RES_MSG.AUTH.NOT_EXIST, HttpStatus.BAD_REQUEST);
      }

      const userPassword = await this.userService.getUserPasswordByEmail(
        loginDTO.email,
      );

      const isMatch = bcrypt.compare(userPassword, loginDTO.password);

      if (isMatch) {
        return user;
      } else {
        null;
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  async login(user: UserEntity) {
    const accessToken = this.signAccessToken(user);
    return accessToken;
  }

  async signup(
    signupDTO: SignupRequestDTO,
  ): Promise<ApiResponse<SignupResponseDTO>> {
    try {
      const user = await this.userService.findUserByEmail(signupDTO.email);

      if (user) {
        throw new HttpException(
          RES_MSG.AUTH.ALREADY_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const newUser = await this.userService.createUser({
        ...signupDTO, // signupDTO : {email, username}
        id: `테스트 아이디${Math.random()}`,
        password: bcrypt.hashSync(signupDTO.password, salt),
        signupAt: new Date(),
        refreshToken: `Test Token${Math.random()}`,
        boards: [],
      });

      return success<SignupResponseDTO>({
        email: newUser.email,
        username: newUser.username,
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  // ###### Google ######
  async loginGoogle(
    googleUser: GoogleUserType,
  ): Promise<ApiResponse<LoginResponseDTO>> {
    try {
      const user = await this.userService.findUserByEmail(googleUser.email);

      if (!user) {
        await this.userService.createUser({
          ...googleUser,
          id: `테스트 아이디${Math.random()}`,
          password: 'google',
          signupAt: new Date(),
          refreshToken: `Test Tokenzzzz${Math.random()}`,
          boards: [],
        });
      }

      const accessToken = this.signAccessToken(user);

      return success<LoginResponseDTO>({
        email: user.email,
        username: user.username,
        accessToken: accessToken,
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  // ###### Kakao ######
  async loginKakao(
    kakaoUser: GoogleUserType,
  ): Promise<ApiResponse<LoginResponseDTO>> {
    try {
      const user = await this.userService.findUserByEmail(kakaoUser.email);

      if (!user) {
        await this.userService.createUser({
          ...kakaoUser,
          id: `테스트 아이디${Math.random()}`,
          password: 'kakao',
          signupAt: new Date(),
          refreshToken: `Test Tokenzzzz${Math.random()}`,
          boards: [],
        });
      }

      const accessToken = this.signAccessToken(user);

      return success<LoginResponseDTO>({
        email: user.email,
        username: user.username,
        accessToken: accessToken,
      });
    } catch (error) {
      errorHandler(error);
    }
  }
}
