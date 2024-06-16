import { Injectable, Post } from '@nestjs/common';
import { FirebaseClientService } from '../../firebase/firebase-client.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly clientService: FirebaseClientService) {}

  @Post()
  async singUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const user = await this.clientService.createFirebaseUser(email, password);
    return { email: user.email, emailVerified: user.emailVerified };
  }

  @Post()
  async singIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    return this.clientService.signInAndSendVerification(email, password);
  }
}
