import logger from '@/utils/logger';
import { Result } from '@common/core/Result';
import { HttpCode } from '@common/exceptions/appError';
import { Request, Response, NextFunction } from 'express';
import { JoiValidatorFunction } from '@common/interfaces/joi.interface';

export function validate(validatorFunction: JoiValidatorFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    let { error } = validatorFunction(req, res);
    if (error) {
      logger.error(error.details);
      const errorResult = Result.fail(error.message);
      return res.status(HttpCode.UPROCESSABLE_CONTENT).json(errorResult);
    } else {
      next();
    }
  };
}
