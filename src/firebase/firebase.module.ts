import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import { FirebaseMiddleware } from './firebase.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, FirebaseService, FirebaseMiddleware],
  exports: [FirebaseService, FirebaseMiddleware],
})
export class FirebaseModule {
}
