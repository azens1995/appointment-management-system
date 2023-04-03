import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../exceptions/errorHandler';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  errorHandler.handleError(err, res);
}
