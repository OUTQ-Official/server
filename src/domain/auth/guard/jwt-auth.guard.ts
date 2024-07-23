import { JwtService } from '@nestjs/jwt';
import { errorHandler } from 'src/interceptor/http.interceptor';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request;
      const user = await this.jwtService.verify(accessToken);
      request.user = user;
      return user;
    } catch (error) {
      errorHandler(error);
    }
  }
}
