import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isUserAlreadyExist = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return existingUser ? true : false;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  const userData = await prisma.user.create({
    data
  });

  return userData;
};
