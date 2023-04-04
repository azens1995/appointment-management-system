import { Prisma } from '@prisma/client';
import prisma from '@config/client';

export const getExistingUser = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return existingUser;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  const userData = await prisma.user.create({
    data
  });

  return userData;
};

export const fetchUser = async () => {
  const userData = await prisma.user.findMany({});

  return userData;
};
