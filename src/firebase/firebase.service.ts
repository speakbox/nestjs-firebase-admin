import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  public readonly app;
  public readonly auth;
  public readonly firestore;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    if (!this.app && admin.apps.length === 0) {
      if (config.get('APP_ENV') !== 'development') {
        this.app = admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          projectId: config.get('GOOGLE_CLOUD_PROJECT'),
        });
      } else {
        this.app = admin.initializeApp({
          projectId: config.get('GOOGLE_CLOUD_PROJECT'),
        });
      }
    } else {
      this.app = admin.apps[0];
    }

    this.auth = this.app.auth();
    this.firestore = this.app.firestore();
  }
}
