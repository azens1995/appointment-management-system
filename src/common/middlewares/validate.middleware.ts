import { sendResponse } from '@utils/http';
import { HttpError } from '@utils/message';
import { Request, Response, NextFunction } from 'express';
import { JoiValidatorFunction } from '../interfaces/joi.interface';

export function validate(validatorFunction: JoiValidatorFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    let { error } = validatorFunction(req, res);

    if (error) {
      const responseData = HttpError.ValidationError(
        error.message,
        error.details
      );
      return sendResponse(res, responseData);
    } else {
      next();
    }
  };
}
