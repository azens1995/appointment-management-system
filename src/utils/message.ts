import {
  GENERIC_OK_RESPONSE_MESSAGE,
  GENERIC_CREATED_MESSAGE,
  GENERIC_NO_CONTENT_MESSAGE
} from './../constants/responseMessages';
import { HttpResponse } from '@common/interfaces/response.interface';
import { GENERIC_SERVER_ERROR_MESSAGE } from 'constants/responseMessages';

export const HttpError = {
  BadRequest: <T>(message: string, data: T = {} as T): HttpResponse<T> => {
    return {
      code: 400,
      status: 'error',
      message,
      data
    };
  },

  UnAuthorized: <T>(message: string, data: T = {} as T): HttpResponse<T> => {
    return {
      code: 401,
      status: 'error',
      message,
      data
    };
  },

  Forbidden: <T>(message: string, data: T = {} as T): HttpResponse<T> => {
    return {
      code: 403,
      status: 'error',
      message,
      data
    };
  },

  NotFound: <T>(message: string, data: T = {} as T): HttpResponse<T> => {
    return {
      code: 404,
      status: 'error',
      message,
      data
    };
  },

  Conflict: <T>(message: string, data: T = {} as T): HttpResponse<T> => {
    return {
      code: 409,
      status: 'error',
      message,
      data
    };
  },

  ValidationError: <T>(message: string, data: T = {} as T): HttpResponse<T> => {
    return {
      code: 422,
      status: 'error',
      message,
      data
    };
  },

  ServerError: <T>(
    message: string = GENERIC_SERVER_ERROR_MESSAGE,
    data: T = {} as T
  ): HttpResponse<T> => {
    return {
      code: 500,
      status: 'error',
      message,
      data
    };
  }
};

export const HttpSuccess = {
  OK: <T>(
    data: T = {} as T,
    message: string = GENERIC_OK_RESPONSE_MESSAGE
  ): HttpResponse<T> => {
    return {
      code: 200,
      status: 'success',
      message,
      data
    };
  },

  Created: <T>(
    data: T,
    message: string = GENERIC_CREATED_MESSAGE
  ): HttpResponse<T> => {
    return {
      code: 201,
      status: 'success',
      message,
      data
    };
  },

  NoContent: <T>(
    data: T = {} as T,
    message: string = GENERIC_NO_CONTENT_MESSAGE
  ): HttpResponse<T> => {
    return {
      code: 204,
      status: 'success',
      message,
      data
    };
  }
};
