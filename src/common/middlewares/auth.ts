import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_TOKEN_SECRET_KEY } from '@config/appConfig';

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
          return res.status(400).json({ message: 'Access Token expired.' });
        } else {
          return res.status(500).json({ message: err });
        }
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized User' });
    }
  } catch (error) {
    next(error);
  }
};
