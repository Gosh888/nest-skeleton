import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogging');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers } = req;
    this.logger.log(
      `Request - Method: ${method}, URL: ${originalUrl}, Headers: ${JSON.stringify(headers)}`,
    );
    next();
  }
}
