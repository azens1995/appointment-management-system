import { Request, Response, NextFunction } from 'express';
import { JoiValidatorFunction } from '../interfaces/joi.interface';

export function validate(validatorFunction: JoiValidatorFunction) {
  return (req: Request, res: Response, next: NextFunction) => {

    let { error } = validatorFunction(req, res);

    if (error) {
      return res.status(422).json({ message: error.details });
    } else {
      next();
    }
  };
}
