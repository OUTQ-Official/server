import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { LoginRequestDTO } from '../dto/auth.dto';
import { UserEntity } from 'src/domain/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userEmail',
      passwordField: 'userPwd',
    });
  }

  async validate(eamil: string, password: string): Promise<UserEntity> {
    const loginDTO: LoginRequestDTO = {
      userEmail: eamil,
      userPwd: password,
    };
    const user = await this.authService.validateUser(loginDTO);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
