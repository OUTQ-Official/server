import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoStrategy } from './strategies/kakao-auth.strategy';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfigServices } from 'src/config/jwt.config';
import { JwtStrategy, RefreshStrategy } from './strategies/jwt-auth.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JwtConfigServices,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshStrategy,
    LocalStrategy,
    GoogleStrategy,
    KakaoStrategy,
    UsersService,
    UserEntity,
  ],
})
export class AuthModule {}
