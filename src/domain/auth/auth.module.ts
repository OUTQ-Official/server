import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoStrategy } from './strategies/kakao-auth.strategy';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfigServices } from 'src/config/jwt.config';
import {
  JwtAccessStrategy,
  RefreshStrategy,
} from './strategies/jwt-auth.strategy';
import { AuthEntity } from 'src/domain/auth/entities/auth.entity';
import { CompanyEntity } from 'src/domain/company/entities/company.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity, AuthEntity, CompanyEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JwtConfigServices,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
    RefreshStrategy,
    LocalStrategy,
    GoogleStrategy,
    KakaoStrategy,
    UsersService,
    UserEntity,
  ],
})
export class AuthModule {}
