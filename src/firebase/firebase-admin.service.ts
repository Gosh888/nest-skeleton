import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import axios from 'axios';
import * as admin from 'firebase-admin';
import { REFRESH_TOKEN } from 'src/config/config';
import { getFirebaseAdminConfig } from 'src/core/core.utils';
import { UnauthorizedError } from 'src/errors/errors';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private static instance: admin.app.App;

  onModuleInit() {
    if (!FirebaseAdminService.instance) {
      FirebaseAdminService.instance = admin.initializeApp({
        credential: admin.credential.cert(getFirebaseAdminConfig()),
      });
    }
  }

  getInstance(): admin.app.App {
    return FirebaseAdminService.instance;
  }

  async validateToken(token: string) {
    try {
      if (!token) return null;
      const admin = this.getInstance();
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) return decodedToken;
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const {
        data: { access_token: accessToken },
      } = await axios.post(REFRESH_TOKEN.URL, {
        grant_type: REFRESH_TOKEN.TYPE,
        refresh_token: refreshToken,
      });
      return { accessToken };
    } catch {
      throw new UnauthorizedError();
    }
  }
}
