import { Prisma } from '@prisma/client';
import prisma from '@config/client';

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
  const appointment = await prisma.appointment.deleteMany({
    where: { id: appointmentId, appointmentBy: userId }
  });
  return appointment;
}

module.exports = {
  createAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  getAppointmentForUserId,
  updateAppointmentById,
  deleteAppointmentById
};
