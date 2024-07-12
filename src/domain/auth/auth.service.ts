import { Injectable } from '@nestjs/common';
import { LoginRequestDTO, OauthLoginRequestDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async login(body: LoginRequestDTO) {
    return body;
  }

  signup() {
    return 'signup';
  }

  async loginWithGoogle({ code }: OauthLoginRequestDTO) {
    try {
      const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
      const body = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_PW,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      };
    } catch (error) {}
    return 'google';
  }

  async loginWithKakao({ code }: OauthLoginRequestDTO) {

  }
}
