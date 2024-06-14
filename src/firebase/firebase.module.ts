import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase.service';

@Module({
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService],
})
export class FirebaseModule {}
