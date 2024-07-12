import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

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

// export class GoogleAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> | any {
//     console.log(context);
//     console.log(context.switchToHttp());
//     const request = context.switchToHttp().getRequest();
//   }
// }
