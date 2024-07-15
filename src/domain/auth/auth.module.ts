import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UserModel } from '../users/model/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UsersService, UserModel],
})
export class AuthModule {}
