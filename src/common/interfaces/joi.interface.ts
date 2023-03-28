import { Request, Response } from 'express';
import { ValidationResult } from 'joi';

export type JoiValidatorFunction = (
  req: Request,
  res: Response
) => ValidationResult<any>;
