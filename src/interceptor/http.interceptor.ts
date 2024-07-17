import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from './api.-response.interceptor';

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
