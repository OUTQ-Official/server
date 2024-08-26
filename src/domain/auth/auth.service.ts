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
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { AuthEntity } from 'src/entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(AuthEntity)
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  // ###### Auth ######
  async createAuth(refreshToken: string) {
    const newAuth = this.authRepository.create({
      refreshToken: refreshToken,
    });
    return this.authRepository.save(newAuth);
  }

  // ###### JWT ######
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<ApiResponse<RefreshAccessTokenResponseDTO>> {
    const decodedPayload: PayloadType = this.jwtService.verify(refreshToken);

    // const userEmail = decodedPayload.userEmail;
    // const userRefreshToken =
    //   await this.userService.getRefreshTokenByEmail(userEmail);
    const userRefreshToken = 'test';
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
      email: payload.userEmail,
      username: payload.userName,
    });
  }

  generateRefreshToken(payload: PayloadType): Promise<string> {
    return this.jwtService.signAsync(
      {
        email: payload.userEmail,
        username: payload.userName,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      },
    );
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
      email: user.userEmail,
      username: user.userName,
      accessToken: accessToken,
    });
  }

  async signup(
    signupDTO: SignupRequestDTO,
  ): Promise<ApiResponse<SignupResponseDTO>> {
    try {
      const user = await this.userService.findUserByEmail(signupDTO.userEmail);

      if (user) {
        throw new HttpException(
          RES_MSG.AUTH.ALREADY_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const newUser = await this.userService.createUser({
        ...signupDTO, // signupDTO : {email, username}
        userId: uuidv4(),
        userPwd: bcrypt.hashSync(signupDTO.userPwd, salt),
      });

      const refreshToken = await this.generateRefreshToken({
        userEmail: signupDTO.userEmail,
        userName: signupDTO.userName,
      });

      await this.createAuth(refreshToken);

      return success<SignupResponseDTO>({
        ...newUser,
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
        // await this.userService.createUser({
        //   ...googleUser,
        // });
      }

      const accessToken = this.generateAccessToken(user);

      return success<LoginResponseDTO>({
        email: user.userEmail,
        username: user.userName,
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
        // await this.userService.createUser({
        //   ...kakaoUser,
        //   id: `테스트 아이디${Math.random()}`,
        //   password: 'kakao',
        //   signupAt: new Date(),
        //   refreshToken: await this.generateRefreshToken({
        //     email: kakaoUser.email,
        //     username: kakaoUser.username,
        //   }),
        //   boards: [],
        // });
      }

      const accessToken = this.generateAccessToken(user);

      return success<LoginResponseDTO>({
        email: user.userEmail,
        username: user.userName,
        accessToken: accessToken,
      });
    } catch (error) {
      errorHandler(error);
    }
  }
}
