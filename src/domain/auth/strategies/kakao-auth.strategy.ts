import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GoogleUserType } from '../interface/google-user.interface';
import { Strategy, Profile } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_REST_API_KEY,
      callbackURL: process.env.KAKAO_REDIRECT_URI,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<GoogleUserType> {
    const { email } = profile._json.kakao_account;
    const { nickname } = profile._json.kakao_account.profile;

    const user: GoogleUserType = {
      email: email,
      username: nickname,
    };

    return user;
  }
}
