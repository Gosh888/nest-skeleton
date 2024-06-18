import { Injectable } from '@nestjs/common';
import { FirebaseClientService } from '../../firebase/firebase-client.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';
import { UserCredential } from '@firebase/auth';
import { AuthResponseDto } from './dto/auth-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseClientService: FirebaseClientService,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  async singUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const userCredential = await this.firebaseClientService.createFirebaseUser(
      email,
      password,
    );
    return this.mapAuthData(userCredential);
  }

  async singIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const userCredential =
      await this.firebaseClientService.signInAndSendVerification(
        email,
        password,
      );
    return this.mapAuthData(userCredential);
  }

  async refreshToken(refreshToken: string) {
    return this.firebaseAdminService.refreshToken(refreshToken);
  }

  mapAuthData(userCredential: UserCredential) {
    return plainToClass(AuthResponseDto, userCredential.user.toJSON(), {
      excludeExtraneousValues: true,
    });
  }
}
