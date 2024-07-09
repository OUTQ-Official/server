import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OauthModule } from './oauth/oauth.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [OauthModule],
})
export class AuthModule {}
