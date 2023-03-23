import { validateSignup } from '../validator';
import { Request, Response, NextFunction } from 'express';

export const validation = (req: Request, res: Response, next: NextFunction) => {
  let error;

  switch (req.url) {
    case '/signup':
      ({ error } = validateSignup(req.body));
      break;
    default:
      break;
  }

  if (error) {
    return res.status(422).json({ message: error.details });
  } else {
    next();
  }
};
