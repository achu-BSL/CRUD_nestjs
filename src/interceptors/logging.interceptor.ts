import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogginInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as Request;
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    this.logger.log(`
        ${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${
          context.getHandler().name
        } invoked...
        `);

    const now = Date.now();
    return next.handle().pipe(
        tap((res) => {
            const response = context.switchToHttp().getResponse() as Response;
            const { statusCode } = response;
            const contentLength = response.get('content-length') || '';

            this.logger.log(`
                ${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${
                    Date.now() - now
                }ms
            `);
            this.logger.debug('Response', res);
        })
    )
  }
}
