import { NextFunction, Request, Response } from 'express';
import { errorHanler } from '../exceptions/errorHandler';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  errorHanler.handleError(err, res);
}
