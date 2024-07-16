import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UsersService, UserEntity],
})
export class AuthModule {}
