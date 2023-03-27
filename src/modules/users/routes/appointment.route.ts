import { appointmentCreateValidator } from './../validators/appointment.validation';
import express, { Application } from 'express';
import { validate } from '../middlewares/validate.middleware';
import * as AppointmentController from '../controllers/appointment.controller';

const appointmentRouter = express.Router();

appointmentRouter.post('/', validate(appointmentCreateValidator), AppointmentController.createAppointment);
appointmentRouter.get('/', AppointmentController.getUserCreatedAppointments as any);

export default appointmentRouter;
