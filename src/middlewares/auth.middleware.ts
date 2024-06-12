import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  ERROR_MESSAGES,
  HTTP_STATUS_MESSAGES,
} from 'src/constants/common.constant';
import { FirebaseAdminService } from 'src/firebase/firebase.service';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  private readonly logger = new Logger(DecodeTokenMiddleware.name);

  constructor(private readonly adminService: FirebaseAdminService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const admin = this.adminService.getInstance();
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        req['user'] = decodedToken;
        return next();
      }
      return res
        .status(401)
        .json({ message: HTTP_STATUS_MESSAGES.UNAUTHORIZED });
    } catch (error) {
      this.logger.error(`${ERROR_MESSAGES.DECODE_TOKEN}:`, error.message);
      return res
        .status(500)
        .json({ message: HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }
}
