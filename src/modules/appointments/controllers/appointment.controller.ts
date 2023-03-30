import { Response, NextFunction, Request } from 'express';
import * as AppointmentService from '../services/appointment.service';
import { RequestWithUser } from '../../../common/interfaces/express.interface';

export const getUserCreatedAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await AppointmentService.getUserCreatedAppointments({
      userId: (req as RequestWithUser).user.id,
      ...req.query
    });

    return res.status(response.status).json(response.data);
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
    const response = await AppointmentService.createAppointment({
      ...req.body,
      appointmentBy: (req as RequestWithUser).user.id
    });

    return res.status(response.status).json(response.data);
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
    const response = await AppointmentService.updateAppointment(req.params.id, {
      ...req.body,
      appointmentBy: (req as RequestWithUser).user.id
    });

    return res.status(response.status).json(response.data);
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
    const response = await AppointmentService.deleteAppointment(
      req.params.id,
      (req as RequestWithUser).user.id
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};
