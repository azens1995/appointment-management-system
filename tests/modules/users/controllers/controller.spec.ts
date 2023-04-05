import { Result } from '@common/core/Result';
import { signup } from '@modules/users/controllers/user.controller';
import { HttpCode } from '@common/exceptions/appError';
import { Request, Response } from 'express';
import { userSignup } from '@modules/users/services/user.service';

jest.mock('@modules/users/services/user.service');

describe('signup controller', () => {
  const mockReq: Partial<Request> = {
    body: {
      email: 'test@example.com',
      password: 'password123'
    }
  };

  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  const mockUserData = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown USA',
    isActive: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call userSignup with the correct arguments', async () => {
    const mockUserSignup = userSignup as jest.MockedFunction<typeof userSignup>;

    mockUserSignup.mockResolvedValueOnce(mockUserData);

    await signup(mockReq as Request, mockRes as Response);

    expect(mockUserSignup).toHaveBeenCalledWith(mockReq.body);
  });

  test('should return the correct response with status 201', async () => {
    const mockUserSignup = userSignup as jest.MockedFunction<typeof userSignup>;
    mockUserSignup.mockResolvedValueOnce(mockUserData);

    await signup(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(HttpCode.CREATED);
    expect(mockRes.json).toHaveBeenCalledWith(Result.ok(mockUserData));
  });
});
