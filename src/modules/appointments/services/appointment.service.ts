import { Prisma } from '@prisma/client';
import { getCurrentDate } from '@utils/date';
import { AppError } from '@common/exceptions/appError';
import * as AppointmentRepository from '../repository/appointment.repository';
import { GetUserCreatedAppointmentPayload } from '@modules/appointments/interfaces/userCreatedAppointment.interface';

export const createAppointment = async (
  payload: Prisma.AppointmentUncheckedCreateInput
) => {
  const appointment = await AppointmentRepository.createAppointment({
    ...payload,
    date: new Date(payload.date)
  });
  if (!appointment) {
    throw AppError.badRequest(`Error while creating the appointment.`);
  }
  return appointment;
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
  const appointments = await AppointmentRepository.getAppointmentsByUserId(
    userId,
    limit,
    page,
    sortBy,
    sortDir
  );
  if (!appointments) {
    throw AppError.badRequest(`Error while fetching the appointmetns`);
  }
  return appointments;
};

export const getAppointment = async (appointmentId: string, userId: string) => {
  const appointment = await AppointmentRepository.getAppointmentById(
    appointmentId
  );
  if (
    !appointment ||
    ![appointment.appointmentBy, appointment.appointmentFor].includes(userId)
  ) {
    throw AppError.notFound(
      `Appointment with Id ${appointmentId} could not be found.`
    );
  }
  return appointment;
};

export const updateAppointment = async (
  appointmentId: string,
  payload: Prisma.AppointmentUncheckedUpdateInput
) => {
  const date = payload.date ? new Date(payload.date as string) : '';

  const updateData = date ? { ...payload, date } : payload;
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
  const appointmentUpdateRes =
    await AppointmentRepository.updateAppointmentById(
      appointmentId,
      updateData
    );
  if (!appointmentUpdateRes) {
    throw AppError.badRequest(
      `Error while updating appointment with ID ${appointmentId}.`
    );
  }
  return `Appointment with Id ${appointmentId} has been updated successfully.`;
};

export const deleteAppointment = async (
  appointmentId: string,
  userId: string
) => {
  const oldAppointment = await AppointmentRepository.getAppointmentById(
    appointmentId
  );
  if (!oldAppointment) {
    throw AppError.badRequest(
      `There is no appointments available with Id ${appointmentId}. Please check the appointment Id.`
    );
  }
  const res = await AppointmentRepository.deleteAppointmentById(
    appointmentId,
    userId
  );
  if (!res) {
    throw AppError.badRequest(
      `Error while deleting the appointment for ID ${appointmentId}`
    );
  }
  return `Appointment with Id ${appointmentId} deleted successfully`;
};
