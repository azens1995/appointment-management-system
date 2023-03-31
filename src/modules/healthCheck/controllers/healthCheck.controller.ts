import { sendResponse } from '@utils/http';
import { Request, Response, NextFunction } from 'express';
import { getHealthCheck } from '../services/healthCheck.services';

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
  try {
    const responseData = await getHealthCheck();

    return sendResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};
