import * as admin from 'firebase-admin';

export default admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: admin.auth.DecodedIdToken;
        }
    }
}
