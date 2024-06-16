import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirebaseClientConfig } from 'src/core/core.utils';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { ForbiddenError } from '../errors/errors'; // Import Auth

@Injectable()
export class FirebaseClientService implements OnModuleInit {
  private static instance: FirebaseApp;
  private static authInstance: Auth; // Add this line

  onModuleInit() {
    if (!FirebaseClientService.instance) {
      FirebaseClientService.instance = initializeApp(getFirebaseClientConfig());
      FirebaseClientService.authInstance = getAuth(
        FirebaseClientService.instance,
      ); // Initialize auth
    }
  }

  getInstance(): FirebaseApp {
    return FirebaseClientService.instance;
  }

  getAuthInstance(): Auth {
    // Add this method
    return FirebaseClientService.authInstance;
  }

  async createFirebaseUser(email: string, password: string) {
    try {
      const auth = this.getAuthInstance();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      return userCredential.user;
    } catch (e) {
      throw new ForbiddenError(e.message);
    }
  }

  signInWithEmailAndPasswordOrFail = async (
    email: string,
    password: string,
  ) => {
    try {
      const auth = this.getAuthInstance();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (e) {
      throw new ForbiddenError(e.message);
    }
  };

  signInAndSendVerification = async (email: string, password: string) => {
    const user = await this.signInWithEmailAndPasswordOrFail(email, password);
    if (!user.emailVerified) {
      throw new ForbiddenError('Email not verified');
    }
    return user;
  };
}
