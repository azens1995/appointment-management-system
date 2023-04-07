import { Result } from '@common/core/Result';
import { HttpCode } from '@common/exceptions/appError';
import { Response, NextFunction, Request } from 'express';
import { RequestWithUser } from '@common/interfaces/express.interface';
import * as appointmentService from '@modules/appointments/services/appointment.service';
import { log } from 'console';
import logger from '@/utils/logger';

export const getUserCreatedAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await appointmentService.getUserCreatedAppointments({
    userId: (req as RequestWithUser).user.id,
    ...req.query
  });
  const responseData = Result.ok(data);
  return res.status(HttpCode.OK).json(responseData);
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await appointmentService.createAppointment({
    ...req.body,
    appointmentBy: (req as RequestWithUser).user.id
  });
  const responseData = Result.ok(data);
  return res.status(HttpCode.CREATED).json(responseData);
};

export const getAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await appointmentService.getAppointment(
    req.params.id,
    (req as RequestWithUser).user.id
  );
  const responseData = Result.ok(data);
  return res.status(HttpCode.OK).json(responseData);
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await appointmentService.updateAppointment(req.params.id, {
    ...req.body,
    appointmentBy: (req as RequestWithUser).user.id
  });
  const responseData = Result.ok(data);
  return res.status(HttpCode.OK).json(responseData);
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await appointmentService.deleteAppointment(
    req.params.id,
    (req as RequestWithUser).user.id
  );
  const responseData = Result.ok(data);
  return res.status(HttpCode.OK).json(responseData);
};
