import { Response } from 'express';
import { HttpResponse } from '@common/interfaces/response.interface';

export function sendResponse<T>(res: Response, responseData: HttpResponse<T>) {
  return res.status(responseData.code).json(responseData);
}
