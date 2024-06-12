import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_CONFIG } from 'src/config/config';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private static instance: admin.app.App;

  onModuleInit() {
    if (!FirebaseAdminService.instance) {
      FirebaseAdminService.instance = admin.initializeApp({
        credential: admin.credential.cert(
          FIREBASE_CONFIG as admin.ServiceAccount,
        ),
      });
    }
  }

  getInstance(): admin.app.App {
    return FirebaseAdminService.instance;
  }
}
