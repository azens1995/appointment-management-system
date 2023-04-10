import jwt from 'jsonwebtoken';
import { Result } from '@/common/core/Result';
import { auth } from '@/common/middlewares/auth';
import { NextFunction, Request, Response, response } from 'express';

jest.mock('jsonwebtoken');

describe('Auth Middleware Test', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: 'Bearer abcd'
      }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('it should throw 401 error with no auth headers', () => {
    // Arrange
    mockRequest.headers.authorization = null;
    const errorResponse = Result.fail('Unauthorized User');
    const statusCode = 401;
    // Act
    auth(mockRequest as Request, mockResponse as Response, nextFunction);
    // Assert
    expect(mockResponse.status).toBeCalledWith(statusCode);
    expect(mockResponse.json).toBeCalledWith(errorResponse);
  });

  test('it should call next function with valid auth token', () => {
    // Arrange
    (jwt.verify as jest.MockedFunction<typeof jwt.verify>).mockImplementation(
      (token, secret, options, callback) => {
        return callback(null, { id: 'user_id' });
      }
    );
    // Act
    auth(mockRequest as Request, mockResponse as Response, nextFunction);
    // Assert
    expect(nextFunction).toBeCalled();
  });

  test('it should throw Jwt Expired error with expired token', () => {
    // Arrange
    const errorCode = 400;
    const errorResponse = Result.fail('Access Token expired.');
    (jwt.verify as jest.MockedFunction<typeof jwt.verify>).mockImplementation(
      (token, secret, options, callback) => {
        return callback(
          new Error('jwt expired') as jwt.JsonWebTokenError,
          null
        );
      }
    );
    // Act
    auth(mockRequest as Request, mockResponse as Response, nextFunction);
    // Assert
    expect(mockResponse.status).toBeCalledWith(errorCode);
    expect(mockResponse.json).toBeCalledWith(errorResponse);
  });

  test('it should throw error with invalid auth token', () => {
    // Arrange
    const errorCode = 500;
    const errorResponse = Result.fail('Unauthorized User');
    (jwt.verify as jest.MockedFunction<typeof jwt.verify>).mockImplementation(
      (token, secret, options, callback) => {
        return callback(
          new Error('Unauthorized User') as jwt.JsonWebTokenError,
          null
        );
      }
    );
    // Act
    auth(mockRequest as Request, mockResponse as Response, nextFunction);
    // Assert
    expect(mockResponse.status).toBeCalledWith(errorCode);
    expect(mockResponse.json).toBeCalledWith(errorResponse);
  });
});
