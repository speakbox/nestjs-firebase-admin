import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { NextFunction, Request, Response } from 'express';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  constructor(private firebase: FirebaseService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(
        'Missing authorization header',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const token = authorization.slice(7);
      req.user = await this.firebase.auth.verifyIdToken(token);
      next();
    } catch (error) {
      !!error.message && Logger.error(error.message);

      throw new HttpException(
        error.message || 'Unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user: admin.auth.DecodedIdToken;
    }
  }
}
