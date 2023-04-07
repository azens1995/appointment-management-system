import { Result } from '@/common/core/Result';
import { HttpCode } from '@/common/exceptions/appError';
import { Request, Response, NextFunction } from 'express';
import { getHealthCheck } from '@modules/healthCheck/services/healthCheck.services';

/**
 * Function to handle user server healthcheck
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response | undefined>}
 */
export const getCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const healthInfo = await getHealthCheck();
  const responseData = Result.ok(healthInfo);
  return res.status(HttpCode.OK).json(responseData);
};
