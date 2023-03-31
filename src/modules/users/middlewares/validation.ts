import { sendResponse } from '@utils/http';
import { HttpError } from '@utils/message';
import { validateSignup, validateSignin } from '../validator';
import { Request, Response, NextFunction } from 'express';

export const validation = (req: Request, res: Response, next: NextFunction) => {
  let error;

  switch (req.url) {
    case '/signup':
      ({ error } = validateSignup(req.body));
      break;
    case '/signin':
      ({ error } = validateSignin(req.body));
      break;
    default:
      break;
  }

  if (error) {
    const responseData = HttpError.ValidationError(error.details);
    return sendResponse(res, responseData);
  } else {
    next();
  }
};
