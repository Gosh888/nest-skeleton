import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseAdminService } from 'src/firebase/firebase.service';

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  constructor(private readonly adminService: FirebaseAdminService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers?.authorization?.split(' ')?.[1];
    const decodedToken = await this.adminService.validateToken(token);
    if (!decodedToken) throw new UnauthorizedException();
    req['user'] = decodedToken;
    next();
  }
}
