import * as admin from 'firebase-admin';

export * from './firebase/firebase.module';
export * from './firebase/firebase.service';
export * from './firebase/firebase.middleware';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: admin.auth.DecodedIdToken;
        }
    }
}
