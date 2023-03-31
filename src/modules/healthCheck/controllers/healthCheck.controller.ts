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
    const response = await getHealthCheck();

    return res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};
