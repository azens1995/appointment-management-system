import jwt from 'jsonwebtoken';
import { Result } from '@common/core/Result';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_TOKEN_SECRET_KEY } from '@config/appConfig';
import { AppError, HttpCode } from '@common/exceptions/appError';

const ACCESS_TOKEN: string = ACCESS_TOKEN_SECRET_KEY;

export const auth = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      const error = AppError.unauthorized('Unauthorized User');
      return res.status(error.httpCode).json(Result.fail(error.message));
    }
    token = token.split(' ')[1];
    jwt.verify(token, ACCESS_TOKEN, null, (err, decoded) => {
      if (!err) {
        req.user = decoded as Record<string, any>;
        next();
      } else if (err.message === 'jwt expired') {
        const error = AppError.badRequest('Access Token expired.');
        return res.status(error.httpCode).json(Result.fail(error.message));
      } else {
        return res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json(Result.fail(err.message));
      }
    });
  } catch (error) {
    next(error);
  }
};
