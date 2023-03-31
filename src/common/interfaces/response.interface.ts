import { LooseObject } from './generic.interface';

export interface HttpResponse {
  code: number;
  status: 'success' | 'error';
  message: string;
  data: LooseObject;
}
