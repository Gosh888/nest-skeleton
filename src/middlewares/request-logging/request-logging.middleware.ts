import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LOGGING } from '../../constants/comon.constant';
import { LoggerTags } from '../../enums/logger.tags';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerTags.REQUEST_LOGGING);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers } = req;
    this.logger.log(LOGGING.requestText(method, originalUrl, headers));
    next();
  }
}
