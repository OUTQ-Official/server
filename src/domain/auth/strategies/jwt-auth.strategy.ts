import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async vallidate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
