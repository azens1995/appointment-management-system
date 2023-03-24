import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma, PrismaClient } from '@prisma/client';
import { HttpError, HttpSuccess } from '../../../utils/message';
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY
} from '../../../apiConfig';

const prisma = new PrismaClient();

/**
 * Service for handling user sign up
 *
 * @param payload payloadType
 * @returns {object}
 */
export const userSignup = async (payload: Prisma.UserCreateInput) => {
  const { email, password } = payload;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return HttpError.Conflict('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await prisma.user.create({
      data: {
        ...payload,
        password: hashedPassword
      }
    });

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
