import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model';
import { HttpError, HttpSuccess } from '../../../utils/message';
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY
} from '../../../apiConfig';

interface payloadType {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
  address: string;
  isActive: boolean;
  isVerified: boolean;
}

/**
 * Service for handling user sign up
 *
 * @param payload payloadType
 * @returns {object}
 */
export const userSignup = async (payload: payloadType) => {
  const { email, password } = payload;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return HttpError.Conflict('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await userModel.create({
      ...payload,
      password: hashedPassword
    });

    const accessToken = jwt.sign(
      { email: userData.email, id: userData._id },
      ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '30m' }
    );

    const refreshToken = jwt.sign(
      { email: userData.email, id: userData._id },
      REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '7d' }
    );

    return HttpSuccess.Created({ user: userData, accessToken, refreshToken });
  } catch (error) {
    return HttpError.BadRequest(`Something went wrong. ${error}`);
  }
};
