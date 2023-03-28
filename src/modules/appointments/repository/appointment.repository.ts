import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

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
  page: number
) {
  const appointment = await prisma.appointment.findMany({
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
  page: number
) {
  const appointment = await prisma.appointment.findMany({
    where: { appointmentFor: appointmentForUserId },
    take: limit,
    skip: (page - 1) * limit
  });
  return appointment;
}

// UPDATE an appointment by ID
export async function updateAppointmentById(
  appointmentId: string,
  appointmentData: Prisma.AppointmentUpdateInput
) {
  const appointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: appointmentData
  });
  return appointment;
}

// DELETE an appointment by ID
export async function deleteAppointmentById(appointmentId: string) {
  const appointment = await prisma.appointment.delete({
    where: { id: appointmentId }
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
