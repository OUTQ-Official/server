import { JwtService } from '@nestjs/jwt';
import { errorHandler } from 'src/interceptor/http.interceptor';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // console.log(this.jwtService);
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      const user = await this.jwtService.verifyAsync(token);
      console.log(user);
      // request.user = user;
      // return user;

      const canActivate = await super.canActivate(context);
      console.log(canActivate);

      return true;
    } catch (error) {
      errorHandler(error);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
