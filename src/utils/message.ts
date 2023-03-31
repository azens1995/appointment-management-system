import {
  GENERIC_OK_RESPONSE_MESSAGE,
  GENERIC_CREATED_MESSAGE,
  GENERIC_NO_CONTENT_MESSAGE
} from './../constants/responseMessages';
import { LooseObject } from '@common/interfaces/generic.interface';
import { HttpResponse } from '@common/interfaces/response.interface';
import { GENERIC_SERVER_ERROR_MESSAGE } from 'constants/responseMessages';

export const HttpError = {
  BadRequest: (message: string, data: LooseObject = {}): HttpResponse => {
    return {
      code: 400,
      status: 'error',
      message,
      data
    };
  },

  UnAuthorized: (message: string, data: LooseObject = {}): HttpResponse => {
    return {
      code: 401,
      status: 'error',
      message,
      data
    };
  },

  Forbidden: (message: string, data: LooseObject = {}): HttpResponse => {
    return {
      code: 403,
      status: 'error',
      message,
      data
    };
  },

  NotFound: (message: string, data: LooseObject = {}): HttpResponse => {
    return {
      code: 404,
      status: 'error',
      message,
      data
    };
  },

  Conflict: (message: string, data: LooseObject = {}): HttpResponse => {
    return {
      code: 409,
      status: 'error',
      message,
      data
    };
  },

  ValidationError: (message: string, data: LooseObject = {}): HttpResponse => {
    return {
      code: 422,
      status: 'error',
      message,
      data
    };
  },

  ServerError: (
    message: string = GENERIC_SERVER_ERROR_MESSAGE,
    data: LooseObject = {}
  ): HttpResponse => {
    return {
      code: 500,
      status: 'error',
      message,
      data
    };
  }
};

export const HttpSuccess = {
  OK: (
    data: LooseObject = {},
    message = GENERIC_OK_RESPONSE_MESSAGE
  ): HttpResponse => {
    return {
      code: 200,
      status: 'success',
      message,
      data
    };
  },

  Created: (
    data: LooseObject,
    message = GENERIC_CREATED_MESSAGE
  ): HttpResponse => {
    return {
      code: 201,
      status: 'success',
      message,
      data
    };
  },

  NoContent: (
    data: LooseObject = {},
    message = GENERIC_NO_CONTENT_MESSAGE
  ): HttpResponse => {
    return {
      code: 204,
      status: 'success',
      message,
      data
    };
  }
};
