import { Response, NextFunction } from 'express';
import * as AppointmentService from '../services/appointment.service';
import { RequestWithUser } from '../../../common/interfaces/express.interface';

export const getUserCreatedAppointments = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await AppointmentService.getUserCreatedAppointments({
      userId: req.user.id
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await AppointmentService.createAppointment({
      ...req.body,
      appointmentBy: req.user.id
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    next(error);
  }
};
