import { User } from '@prisma/client';
import UserResponse from '../dto/userResponse.dto';
import LoginResponse from '../dto/loginResponse.dto';

export function mapUserToUserResponse(user: User): UserResponse {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    isActive,
    isVerified,
    createdAt,
    updatedAt
  } = user;
  return {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    isActive,
    isVerified,
    createdAt,
    updatedAt
  } as UserResponse;
}

export function userLoginResponse(
  user: User,
  accessToken: string,
  refreshToken: string
): LoginResponse {
  const { id, firstName, lastName } = user;
  return {
    id,
    name: `${firstName} ${lastName}`,
    accessToken,
    refreshToken
  } as LoginResponse;
}
