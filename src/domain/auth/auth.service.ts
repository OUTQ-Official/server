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
import { PayloadType } from './strategies/jwt-auth.strategy';
import { RefreshAccessTokenResponseDTO } from './dto/jwt-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // // ###### JWT ######
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<ApiResponse<RefreshAccessTokenResponseDTO>> {
    const decodedPayload: PayloadType = this.jwtService.verify(refreshToken);

    const userEmail = decodedPayload.email;
    const userRefreshToken =
      await this.userService.getRefreshTokenByEmail(userEmail);
    if (!userRefreshToken) {
      throw new HttpException(RES_MSG.AUTH.INVALID, HttpStatus.BAD_REQUEST);
    }

    const accessToken = this.generateAccessToken(decodedPayload);

    return success<RefreshAccessTokenResponseDTO>({
      accessToken: accessToken,
    });
  }

  async verifyJwtToken(token: string): Promise<object> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new HttpException(
        RES_MSG.AUTH.NOT_VERIFIED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  generateAccessToken(payload: PayloadType): string {
    return this.jwtService.sign({
      email: payload.email,
      username: payload.username,
    });
  }

  generateRefreshToken(payload: PayloadType): Promise<string> {
    return this.jwtService.signAsync(
      {
        email: payload.email,
        username: payload.username,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      },
    );
  }

  async getRefreshTokenByEmail(email: string) {
    return await this.userService.getRefreshTokenByEmail(email);
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

  async login(user: UserEntity): Promise<ApiResponse<LoginResponseDTO>> {
    const accessToken = this.generateAccessToken(user);

    return success<LoginResponseDTO>({
      email: user.email,
      username: user.username,
      accessToken: accessToken,
    });
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
        refreshToken: await this.generateRefreshToken({
          email: signupDTO.email,
          username: signupDTO.username,
        }),
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
          refreshToken: await this.generateRefreshToken({
            email: googleUser.email,
            username: googleUser.username,
          }),
          boards: [],
        });
      }

      const accessToken = this.generateAccessToken(user);

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
          refreshToken: await this.generateRefreshToken({
            email: kakaoUser.email,
            username: kakaoUser.username,
          }),
          boards: [],
        });
      }

      const accessToken = this.generateAccessToken(user);

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
