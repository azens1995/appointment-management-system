import express from 'express';
import { validate } from '@common/middlewares/validate.middleware';
import * as AppointmentController from '@/modules/appointments/controllers/appointment.controller';
import {
  appointmentCreateValidator,
  appointmentUpdateValidator
} from '../validators/appointment.validation';

const appointmentRouter = express.Router();

appointmentRouter.post(
  '/',
  validate(appointmentCreateValidator),
  AppointmentController.createAppointment
);

appointmentRouter.get('/', AppointmentController.getUserCreatedAppointments);

appointmentRouter.get('/:id', AppointmentController.getAppointment);

appointmentRouter.post(
  '/:id',
  validate(appointmentUpdateValidator),
  AppointmentController.updateAppointment
);

appointmentRouter.delete('/:id', AppointmentController.deleteAppointment);

export default appointmentRouter;
