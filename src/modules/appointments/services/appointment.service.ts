import { Prisma } from '@prisma/client';
import { getCurrentDate } from '@utils/date';
import * as AppointmentRepository from '../repository/appointment.repository';
import { GetUserCreatedAppointmentPayload } from './../interfaces/userCreatedAppointment.interface';
import { AppError } from '@common/exceptions/appError';

export const createAppointment = async (
  payload: Prisma.AppointmentUncheckedCreateInput
) => {
  try {
    const appointment = await AppointmentRepository.createAppointment({
      ...payload,
      date: new Date(payload.date)
    });
    return appointment;
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
    return appointments;
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
      throw AppError.notFound(
        `Appointment with Id ${appointmentId} could not be found.`
      );
    }
    if (appointment.date < getCurrentDate()) {
      throw AppError.badRequest(
        `Past appointmets cannot be updated. Please check the appointment date before update.`
      );
    }
    const { count } = await AppointmentRepository.updateAppointmentById(
      appointmentId,
      updateData
    );
    // TODO: Check the response of the appointment update and update the response using the generic Result.ok()
    return `Appointment with Id ${appointmentId} has been updated successfully.`;
  } catch (error) {
    throw error;
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
      throw AppError.badRequest(
        `There is no appointments available with Id ${appointmentId}. Please check the appointment Id.`
      );
    }
    await AppointmentRepository.deleteAppointmentById(appointmentId, userId);
    return `Appointment with Id ${appointmentId} deleted successfully`;
  } catch (error) {
    throw error;
  }
};
