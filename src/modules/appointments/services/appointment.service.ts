import { Prisma } from '@prisma/client';
import { HttpError, HttpSuccess } from '../../../utils/message';
import * as AppointmentRepository from '../repository/appointment.repository';

export const createAppointment = async (
  payload: Prisma.AppointmentUncheckedCreateInput
) => {
  try {
    const appointment = await AppointmentRepository.createAppointment({
      ...payload,
      date: new Date(payload.date)
    });
    return HttpSuccess.Created(appointment);
  } catch (error) {
    return HttpError.BadRequest('Something went wrong.');
  }
};

export const getUserCreatedAppointments = async (payload: any) => {
  const { userId, limit = 10, page = 1 } = payload;
  try {
    const appointments = await AppointmentRepository.getAppointmentsByUserId(
      userId,
      limit,
      page
    );

    return HttpSuccess.OK(appointments);
  } catch (error) {
    return HttpError.BadRequest('Something went wrong.');
  }
};
