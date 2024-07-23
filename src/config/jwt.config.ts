import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { loadEnv } from './evn.config';

loadEnv();

@Injectable()
export class JwtConfigServices implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    const jwtOptions: JwtModuleOptions = {
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME },
    };

    return jwtOptions;
  }
}
