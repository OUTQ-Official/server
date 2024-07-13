import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UsersService],
})
export class AuthModule {}
