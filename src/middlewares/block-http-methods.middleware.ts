import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { LOGGING } from 'src/constants/common.constant';
import { LoggerTags } from 'src/enums/logger.tags';

@Injectable()
export class MethodBlockMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerTags.HTTP_METHOD_BLOCKING);

  use(req: Request, res: Response, next: NextFunction) {
    const blockedMethods = ['UPDATE', 'OPTIONS', 'HEAD'];

    if (blockedMethods.includes(req.method)) {
      this.logger.log(LOGGING.methodNotAllowed(req.method));
      throw new HttpException(
        LOGGING.METHOD_NOT_ALLOWED,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    next();
  }
}
