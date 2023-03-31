import jwt from 'jsonwebtoken';
import { sendResponse } from '@utils/http';
import { HttpError } from '@utils/message';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_TOKEN_SECRET_KEY } from '../../../config/appConfig';

const ACCESS_TOKEN: string = ACCESS_TOKEN_SECRET_KEY;

export const auth = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(' ')[1];

      jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
        if (!err) {
          req.user = decoded as Record<string, any>;
          next();
        } else if (err.message === 'jwt expired') {
          const responseData = HttpError.BadRequest('Access Token expired!');
          return sendResponse(res, responseData);
        } else {
          const responseData = HttpError.ServerError(err.message);
          return sendResponse(res, responseData);
        }
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    const responseData = HttpError.UnAuthorized('Unauthorized User');
    return sendResponse(res, responseData);
  }
};
