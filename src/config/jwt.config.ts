import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigServices implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    const jwtOptions: JwtModuleOptions = {
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '2h' },
    };

    return jwtOptions;
  }
}
