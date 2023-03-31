import { ValidationResult } from 'joi';
import { Request, Response } from 'express';

export type JoiValidatorFunction = (
  req: Request,
  res: Response
) => ValidationResult<any>;
