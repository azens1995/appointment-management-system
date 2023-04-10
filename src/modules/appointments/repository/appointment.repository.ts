import { Appointment, Prisma } from '@prisma/client';
import prisma from '@config/client';
import logger from '@/utils/logger';

// CREATE an appointment
export async function createAppointment(
  appointmentData: Prisma.AppointmentUncheckedCreateInput
) {
  const appointment = await prisma.appointment.create({
    data: appointmentData
  });
  return appointment;
}

// READ an appointment by ID
export async function getAppointmentById(appointmentId: string) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId }
  });
  return appointment;
}

// READ an appointment by userId
export async function getAppointmentsByUserId(
  appointmentByUserId: string,
  limit: number,
  page: number,
  sortBy: Prisma.AppointmentScalarFieldEnum,
  sortDir: Prisma.SortOrder
) {
  const appointment = await prisma.appointment.findMany({
    orderBy: { [sortBy]: sortDir },
    where: { appointmentBy: appointmentByUserId },
    take: limit,
    skip: (page - 1) * limit
  });
  return appointment;
}

// READ an appointment by userId
export async function getAppointmentForUserId(
  appointmentForUserId: string,
  limit: number,
  page: number,
  sortBy: Prisma.AppointmentScalarFieldEnum,
  sortDir: Prisma.SortOrder
) {
  const appointment = await prisma.appointment.findMany({
    orderBy: { [sortBy]: sortDir },
    where: { appointmentFor: appointmentForUserId },
    take: limit,
    skip: (page - 1) * limit
  });
  return appointment;
}

// UPDATE an appointment by ID
export async function updateAppointmentById(
  appointmentId: string,
  appointmentData: Prisma.AppointmentUncheckedUpdateInput
) {
  // Note: Using Update many as update does not support attributes in
  // where clause if they are non-unique.
  // Reference SO: https://stackoverflow.com/questions/67556792/prisma-update-using-where-with-non-unique-fields
  const appointment = await prisma.appointment.updateMany({
    where: {
      id: appointmentId,
      appointmentBy: appointmentData.appointmentBy as string
    },
    data: appointmentData
  });
  return appointment;
}

// DELETE an appointment by ID
export async function deleteAppointmentById(
  appointmentId: string,
  userId: string
) {
  // Note: Using deleteMany similar to updateMany scenario
  const appointment = await prisma.appointment.deleteMany({
    where: { id: appointmentId, appointmentBy: userId }
  });
  return appointment;
}

