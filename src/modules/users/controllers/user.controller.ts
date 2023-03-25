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
  const response = await userSignup(req.body);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle user signin
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signin = async (req: Request, res: Response) => {
  const response = await userSignin(req.body);

  return res.status(response.status).json(response.data);
};

/**
 * Function to get all users.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const get = async (req: Request, res: Response) => {
  const response = await getUsers();

  return res.status(response.status).json(response.data);
};
