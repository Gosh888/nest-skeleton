import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomError, InternalServerError } from './errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const tempeException =
      exception instanceof CustomError ? exception : new InternalServerError();

    const responseBody = {
      ...tempeException,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.logger.error(exception);
    console.error(responseBody);
    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      tempeException.statusCode,
    );
  }
}
