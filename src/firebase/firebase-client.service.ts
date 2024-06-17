import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirebaseClientConfig } from 'src/core/core.utils';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  UserCredential,
} from '@firebase/auth';
import { ForbiddenError } from '../errors/errors';
import { COMMON_ERROR_MESSAGES } from 'src/constants/common.constant';
import { plainToClass } from 'class-transformer';
import { AuthUserDto } from 'src/api/auth/dto/auth-user.dto';

@Injectable()
export class FirebaseClientService implements OnModuleInit {
  private static instance: FirebaseApp;
  private static authInstance: Auth;

  onModuleInit() {
    if (!FirebaseClientService.instance) {
      FirebaseClientService.instance = initializeApp(getFirebaseClientConfig());
      FirebaseClientService.authInstance = getAuth(
        FirebaseClientService.instance,
      );
    }
  }

  getInstance(): FirebaseApp {
    return FirebaseClientService.instance;
  }

  getAuthInstance(): Auth {
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
      return this.mapUserData(userCredential);
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

      return this.mapUserData(userCredential);
    } catch (e) {
      throw new ForbiddenError(e.message);
    }
  };

  signInAndSendVerification = async (email: string, password: string) => {
    const user = await this.signInWithEmailAndPasswordOrFail(email, password);
    if (!user.emailVerified) {
      throw new ForbiddenError(COMMON_ERROR_MESSAGES.EMAIL_NOT_VERIFIED);
    }
    return user;
  };

  mapUserData(userCredential: UserCredential) {
    return plainToClass(AuthUserDto, userCredential.user.toJSON(), {
      excludeExtraneousValues: true,
    });
  }
}
