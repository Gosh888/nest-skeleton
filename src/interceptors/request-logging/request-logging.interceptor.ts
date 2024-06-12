import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerTags } from '../../enums/logger.tags';
import { LOGGING } from '../../constants/common.constant';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggerTags.RESPONSE_LOGGING);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const elapsedTime = Date.now() - now;
        this.logger.log(LOGGING.responseText(statusCode, elapsedTime));
      }),
    );
  }
}
