import { Injectable } from '@nestjs/common';
import { FirebaseClientService } from '../../firebase/firebase-client.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseClientService: FirebaseClientService,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  async singUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const user = await this.firebaseClientService.createFirebaseUser(
      email,
      password,
    );
    return user;
  }

  async singIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    return this.firebaseClientService.signInAndSendVerification(
      email,
      password,
    );
  }

  async refreshToken(refreshToken: string) {
    return this.firebaseAdminService.refreshToken(refreshToken);
  }
}
