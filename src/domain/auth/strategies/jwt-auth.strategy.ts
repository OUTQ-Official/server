import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/domain/users/users.service';

export interface PayloadType {
  userName: string;
  userEmail: string;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: PayloadType) {
    const user = await this.userService.findUserByEmail(payload.userEmail);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { userEmail: payload.userEmail, userName: payload.userName };
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

  // async validate(request: Request, payload: PayloadType) {
  //   const refreshToken = request.cookies['refreshToken'];
  //   return (
  //     refreshToken === this.authService.getRefreshTokenByEmail(payload.email)
  //   );
  // }
}
