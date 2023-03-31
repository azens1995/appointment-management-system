import { sendResponse } from '@utils/http';
import { Request, Response } from 'express';
import { userSignup, userSignin, getUsers } from '../services/user.service';

/**
 * Function to handle user signup
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signup = async (req: Request, res: Response) => {
  const responseData = await userSignup(req.body);

  return sendResponse(res, responseData);
};

/**
 * Function to handle user signin
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signin = async (req: Request, res: Response) => {
  const responseData = await userSignin(req.body);

  return sendResponse(res, responseData);
};

/**
 * Function to get all users.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const get = async (req: Request, res: Response) => {
  const responseData = await getUsers();

  return sendResponse(res, responseData);
};
