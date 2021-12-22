import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import { ConfigService } from '@nestjs/config';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseMiddleware } from './firebase.middleware';
import { HttpException } from '@nestjs/common';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

describe('FirebaseMiddleware', () => {
  let middleware: FirebaseMiddleware;
  let firebase: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule],
      providers: [FirebaseService, FirebaseMiddleware, ConfigService],
    }).compile();

    middleware = module.get<FirebaseMiddleware>(FirebaseMiddleware);
    firebase = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('it throws an error if authorization header missing', async() => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    await expect(middleware.use(req, res, next)).rejects.toThrow(HttpException);
  });

  it('it throws an error if authorization header is invalid', async() => {
    jest.spyOn(firebase.auth, 'verifyIdToken').mockRejectedValue(() => new Error())
    const req = getMockReq({
      headers: {
        authorization: 'Bearer invalid-token'
      }
    });
    const { res, next } = getMockRes();

    await expect(middleware.use(req, res, next)).rejects.toThrow(HttpException);
  });

  it('it calls next if authorization header is valid', async() => {
    jest.spyOn(firebase.auth, 'verifyIdToken').mockResolvedValue(() => ({} as unknown as UserRecord));
    const req = getMockReq({
      headers: {
        authorization: 'Bearer valid-token'
      }
    });
    const { res, next } = getMockRes();

    await middleware.use(req, res, next)

    expect(next).toHaveBeenCalled();
  });
});
