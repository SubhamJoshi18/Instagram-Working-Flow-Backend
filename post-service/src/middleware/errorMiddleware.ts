import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';
import { createLogger } from '../libs/logger';

const errorLogger = createLogger('error-logger');

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof HttpException) {
    errorLogger.error(`Error En-countered in the HTTP Exception`);

    return res.status(error.getStatusCode()).json({
      message: error.getMessage(),
      name: error.name,
    });
  }
  return res.status(500).json({
    message: 'INTERNAL SERVER ERROR',
  });
};
