import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  status: boolean;
  code: HttpStatus;
  message: string;
  data?: T;
  path?: string;
}

@Injectable()
export class ApiSuccessResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        status: true,
        code: HttpStatus.OK,
        data: data,
        message: '요청 성공',
      })),
    );
  }
}
