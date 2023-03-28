import express from 'express';
import { validate } from '../../../common/middlewares/validate.middleware';
import * as AppointmentController from '../controllers/appointment.controller';
import { appointmentCreateValidator } from '../validators/appointment.validation';

const appointmentRouter = express.Router();

appointmentRouter.post(
  '/',
  validate(appointmentCreateValidator),
  AppointmentController.createAppointment as any
);

appointmentRouter.get(
  '/',
  AppointmentController.getUserCreatedAppointments as any
);

export default appointmentRouter;
