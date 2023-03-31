import { Response } from 'express';
import { HttpResponse } from '@common/interfaces/response.interface';

export function sendResponse(res: Response, responseData: HttpResponse) {
  return res.status(responseData.code).json(responseData);
}
