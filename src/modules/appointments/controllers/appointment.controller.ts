import { sendResponse } from '@utils/http';
import { Response, NextFunction, Request } from 'express';
import * as AppointmentService from '../services/appointment.service';
import { RequestWithUser } from '@common/interfaces/express.interface';

export const getUserCreatedAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await AppointmentService.getUserCreatedAppointments({
      userId: (req as RequestWithUser).user.id,
      ...req.query
    });

    return sendResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await AppointmentService.createAppointment({
      ...req.body,
      appointmentBy: (req as RequestWithUser).user.id
    });

    return sendResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await AppointmentService.updateAppointment(
      req.params.id,
      {
        ...req.body,
        appointmentBy: (req as RequestWithUser).user.id
      }
    );

    return sendResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await AppointmentService.deleteAppointment(
      req.params.id,
      (req as RequestWithUser).user.id
    );

    return sendResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};
