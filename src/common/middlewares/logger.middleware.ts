import { NextFunction, Request, Response } from 'express';
import logger from '@utils/logger';

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} ${req.path}`);
  next();
}

export default loggerMiddleware;
