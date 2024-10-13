import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['authorization'] ?? req.headers.authorization;

    if (!token) {
      throw new BadRequestException(
        null,
        'Token does not exists , you are not authenticated'
      );
    }

    const bearerToken = token.startsWith('B') ? token.split(' ')[1] : token;

    jwt.verify(bearerToken, 'random', (error, payload) => {
      if (error) {
        throw new BadRequestException(null, 'Token Does not match');
      }
      req.user = payload;
      next();
    });
  } catch (err) {
    throw new BadRequestException(null, 'Error in the Bad Request Exceptions');
  }
};
