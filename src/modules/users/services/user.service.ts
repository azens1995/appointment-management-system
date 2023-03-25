import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { HttpError, HttpSuccess } from '../../../utils/message';
import {
  fetchUser,
  createUser,
  getExistingUser
} from '../repository/user.repository';
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY
} from '../../../apiConfig';

/**
 * Service for handling user sign up
 *
 * @param payload Prisma.UserCreateInput
 * @returns {object}
 */
export const userSignup = async (payload: Prisma.UserCreateInput) => {
  const { email, password } = payload;

  try {
    const existingUser = await getExistingUser(email);

    if (existingUser) {
      return HttpError.Conflict('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await createUser({ ...payload, password: hashedPassword });

    const accessToken = jwt.sign(
      { email: userData.email, id: userData.id },
      ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '30m' }
    );

    const refreshToken = jwt.sign(
      { email: userData.email, id: userData.id },
      REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '7d' }
    );

    return HttpSuccess.Created({ user: userData, accessToken, refreshToken });
  } catch (error) {
    return HttpError.BadRequest(`Something went wrong. ${error}`);
  }
};

/**
 * Service for handling user sign in
 *
 * @param payload Prisma.UserCreateInput
 * @returns {object}
 */
export const userSignin = async (payload: Prisma.UserCreateInput) => {
  const { email, password } = payload;

  try {
    const existingUser = await getExistingUser(email);

    if (!existingUser) {
      return HttpError.NotFound('User not found.');
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return HttpError.Invalid('Invalid Credentials.');
    }

    const accessToken = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '30m' }
    );

    const refreshToken = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '7d' }
    );

    return HttpSuccess.Created({
      user: existingUser,
      accessToken,
      refreshToken
    });
  } catch (error) {
    return HttpError.BadRequest('Something went wrong.');
  }
};

/**
 * Service for fetching user
 * @returns {object}
 */
export const getUsers = async () => {
  try {
    const users = await fetchUser();

    return HttpSuccess.OK(users);
  } catch (error) {
    return HttpError.BadRequest('Something went wrong.');
  }
};
