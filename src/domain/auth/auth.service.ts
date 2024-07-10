import { Injectable } from '@nestjs/common';
import { LoginRequestDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async login(body: LoginRequestDTO) {
    return body;
  }

  signup() {
    return 'signup';
  }
}
