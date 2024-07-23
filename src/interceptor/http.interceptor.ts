import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ApiResponse<T> {
  status: boolean;
  code: HttpStatus;
  message: string;
  data?: T;
  path?: string;
}

export function success<T>(data?: T): ApiResponse<T> {
  return {
    status: true,
    code: HttpStatus.OK,
    message: '응답요청성공',
    data: data,
  };
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ApiResponse<unknown>>>();
    const status = exception.getStatus();
    const request = ctx.getRequest<Request>();
    response.status(status).json({
      status: false,
      code: status,
      message: exception.message,
      path: request.url,
    });
  }
}

export const errorHandler = (error: unknown) => {
  if (error instanceof HttpException) {
    throw new HttpException(error.message, error.getStatus());
  } else {
    throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
