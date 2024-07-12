// import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
// import { Request, Response } from 'express';

// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus();
//     const request = ctx.getRequest<Request>();
//     response.status(status).json({
//       statusCode: status,
//       message: exception.message,
//       path: request.url,
//     });
//   }
// }
