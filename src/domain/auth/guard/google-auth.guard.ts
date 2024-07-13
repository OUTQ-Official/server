import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = (await super.canActivate(context)) as boolean;

    if (activate) {
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }

    return activate;
  }
}
