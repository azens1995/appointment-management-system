import { Result } from '@common/core/Result';
import {
  signup,
  signin,
  get
} from '@modules/users/controllers/user.controller';
import { HttpCode } from '@common/exceptions/appError';
import { Request, Response } from 'express';
import {
  userSignup,
  userSignin,
  getUsers
} from '@modules/users/services/user.service';
import LoginResponse from '@/modules/users/dto/loginResponse.dto';

jest.mock('@modules/users/services/user.service');

beforeEach(() => {
  jest.clearAllMocks();
});

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

  //Success case
  test('should call userSignup with the correct arguments', async () => {
    //Arrange
    const mockUserSignup = userSignup as jest.MockedFunction<typeof userSignup>;
    mockUserSignup.mockResolvedValueOnce(mockUserData);
    //Act
    await signup(mockReq as Request, mockRes as Response);
    //Assert
    expect(mockUserSignup).toHaveBeenCalledWith(mockReq.body);
  });

  //Success case
  test('should return the correct response with status 201', async () => {
    //Arrange
    const mockUserSignup = userSignup as jest.MockedFunction<typeof userSignup>;
    mockUserSignup.mockResolvedValueOnce(mockUserData);
    //Act
    await signup(mockReq as Request, mockRes as Response);
    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpCode.CREATED);
    expect(mockRes.json).toHaveBeenCalledWith(Result.ok(mockUserData));
  });
});

describe('signin controller', () => {
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
    name: 'John Doe',
    accessToken: 'john.doe@example.com',
    refreshToken: 'john.doe@example.com'
  } as LoginResponse;

  //Success case
  test('should call userSignin with the correct arguments', async () => {
    //Arrange
    const mockuserSignin = userSignin as jest.MockedFunction<typeof userSignin>;
    mockuserSignin.mockResolvedValueOnce(mockUserData);
    //Act
    await signin(mockReq as Request, mockRes as Response);
    //Assert
    expect(mockuserSignin).toHaveBeenCalledWith(mockReq.body);
  });

  //Success case
  test('should return the correct response with status 200', async () => {
    //Arrange
    const mockuserSignin = userSignin as jest.MockedFunction<typeof userSignin>;
    mockuserSignin.mockResolvedValueOnce(mockUserData);
    //Act
    await signin(mockReq as Request, mockRes as Response);
    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(mockRes.json).toHaveBeenCalledWith(Result.ok(mockUserData));
  });
});

describe('getUsers controller', () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  const mockUserData = [
    {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown USA',
      isActive: true,
      isVerified: true,
      createdAt: '2023-04-06T12:00:18.279Z',
      updatedAt: '2023-04-06T12:00:18.279Z'
    },
    {
      id: '345',
      firstName: 'Xavier',
      lastName: 'Cal',
      email: 'xavier.cal@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown USA',
      isActive: true,
      isVerified: true,
      createdAt: '2023-04-06T12:00:18.279Z',
      updatedAt: '2023-04-06T12:00:18.279Z'
    }
  ];

  //Success case
  test('should call getUsers with the correct arguments', async () => {
    //Arrange
    const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;
    mockGetUsers.mockResolvedValueOnce(mockUserData);
    //Act
    await get(mockReq as Request, mockRes as Response);
    //Assert
    expect(mockGetUsers).toHaveBeenCalled();
  });

  //Success case
  test('should return the correct response with status 200', async () => {
    //Arrange
    const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;
    mockGetUsers.mockResolvedValueOnce(mockUserData);
    //Act
    await get(mockReq as Request, mockRes as Response);
    //Assert
    expect(mockRes.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(mockRes.json).toHaveBeenCalledWith(Result.ok(mockUserData));
  });
});
