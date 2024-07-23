import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

export interface PayloadType {
  username: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async vallidate(payload: PayloadType) {
    return { username: payload.username, email: payload.email };
  }
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    // private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      algorithms: ['HS256'],
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(request: Request, payload: PayloadType) {
    const refreshToken = request.cookies['refreshToken'];
    return (
      refreshToken === this.authService.getRefreshTokenByEmail(payload.email)
    );
  }
}
