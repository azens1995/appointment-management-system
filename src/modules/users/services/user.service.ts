import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { HttpSuccess } from '../../../utils/message';
import {
  fetchUser,
  createUser,
  getExistingUser
} from '../repository/user.repository';
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY
} from '../../../config/appConfig';
import {
  mapUserToUserResponse,
  userLoginResponse
} from '../mappers/userResponseMapper';
import { AppError, HttpCode } from '../../../common/exceptions/appError';

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
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: `User already exists with email ${email}`
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await createUser({ ...payload, password: hashedPassword });

    const res = mapUserToUserResponse(userData);
    return HttpSuccess.Created(res);
  } catch (error) {
    throw error;
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
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: `User with email: ${email} is not registered in our system. Please use registered email to login into the system.`
      });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: `Email or password did not match. Please check your credentials`
      });
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

    const res = userLoginResponse(existingUser, accessToken, refreshToken);
    return HttpSuccess.OK(res);
  } catch (error) {
    throw error;
  }
};

/**
 * Service for fetching user
 * @returns {object}
 */
export const getUsers = async () => {
  try {
    const users = await fetchUser();
    const userResponse = users.map((user) => mapUserToUserResponse(user));
    return HttpSuccess.OK(userResponse);
  } catch (error) {
    throw error;
  }
};
