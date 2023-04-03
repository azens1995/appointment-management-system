import { Prisma } from '@prisma/client';
import { getCurrentDate } from '@utils/date';
import { HttpError, HttpSuccess } from '@utils/message';
import * as AppointmentRepository from '../repository/appointment.repository';
import { GetUserCreatedAppointmentPayload } from './../interfaces/userCreatedAppointment.interface';

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
    throw error;
  }
};

export const getUserCreatedAppointments = async (
  payload: GetUserCreatedAppointmentPayload
) => {
  const {
    userId,
    limit = 10,
    page = 1,
    sortBy = 'id',
    sortDir = 'asc'
  } = payload;
  try {
    const appointments = await AppointmentRepository.getAppointmentsByUserId(
      userId,
      limit,
      page,
      sortBy,
      sortDir
    );

    if (appointments.length) return HttpSuccess.OK(appointments);
    return HttpSuccess.NoContent();
  } catch (error) {
    throw error;
  }
};

export const updateAppointment = async (
  appointmentId: string,
  payload: Prisma.AppointmentUncheckedUpdateInput
) => {
  const date = payload.date ? new Date(payload.date as string) : '';

  const updateData = date ? { ...payload, date } : payload;
  try {
    const appointment = await AppointmentRepository.getAppointmentById(
      appointmentId
    );
    if (!appointment) {
      return HttpError.NotFound('Appointment not found!');
    }
    if (appointment.date < getCurrentDate()) {
      return HttpError.Forbidden('Cannot update past appointments!');
    }

    const { count } = await AppointmentRepository.updateAppointmentById(
      appointmentId,
      updateData
    );

    if (!count) {
      return HttpError.NotFound('Appointment not found!', { appointmentId });
    }

    const updatedAppointment = await AppointmentRepository.getAppointmentById(
      appointmentId
    );

    return HttpSuccess.OK(updatedAppointment, 'Updated successfully!');
  } catch (error) {
    return HttpError.ServerError();
  }
};

export const deleteAppointment = async (
  appointmentId: string,
  userId: string
) => {
  try {
    const oldAppointment = await AppointmentRepository.getAppointmentById(
      appointmentId
    );
    if (!oldAppointment) {
      return HttpError.NotFound('Appointment not found!');
    }
    if (oldAppointment.date < getCurrentDate()) {
      return HttpError.Forbidden('Cannot delete past appointments!');
    }

    const { count } = await AppointmentRepository.deleteAppointmentById(
      appointmentId,
      userId
    );

    if (!count) {
      return HttpError.NotFound('Appointment not found!');
    }

    return HttpSuccess.OK(oldAppointment, 'Deleted successfully!');
  } catch (error) {
    return HttpError.ServerError();
  }
};
