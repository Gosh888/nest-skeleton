import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getFirebaseAdminConfig } from 'src/core/core.utils';

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
}
