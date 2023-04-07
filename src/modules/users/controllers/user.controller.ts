import { Request, Response } from 'express';
import { Result } from '@common/core/Result';
import { HttpCode } from '@common/exceptions/appError';
import {
  userSignup,
  userSignin,
  getUsers
} from '@modules/users/services/user.service';

/**
 * Function to handle user signup
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signup = async (req: Request, res: Response) => {
  const data = await userSignup(req.body);
  const responseData = Result.ok(data);
  return res.status(HttpCode.CREATED).json(responseData);
};

/**
 * Function to handle user signin
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signin = async (req: Request, res: Response) => {
  const data = await userSignin(req.body);
  const responseData = Result.ok(data);
  return res.status(HttpCode.OK).json(responseData);
};

/**
 * Function to get all users.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const get = async (req: Request, res: Response) => {
  const data = await getUsers();
  const responseData = Result.ok(data);
  return res.status(HttpCode.OK).json(responseData);
};
