import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

(async function main() {
  try {
    const data = await prisma.user.createMany({
      data: [
        {
          firstName: 'John',
          lastName: 'Doe1',
          email: 'johndoe1@gmail.com',
          phoneNumber: '9848565658',
          password: 'Award123$',
          address: 'Washington DC'
        },
        {
          firstName: 'John',
          lastName: 'Doe2',
          email: 'johndoe2@gmail.com',
          phoneNumber: '9848565658',
          password: 'Award234#',
          address: 'Miami'
        }
      ]
    });

    const appointmentBy = await prisma.user.findFirst({
      where: { lastName: 'Doe1' }
    });
    const apointmentFor = await prisma.user.findFirst({
      where: { lastName: 'Doe2' }
    });

    await prisma.appointment.create({
      data: {
        title: 'Appointment By Doe1 For Doe2',
        date: new Date(),
        appointmentBy: appointmentBy?.id as string,
        appointmentFor: apointmentFor?.id as string
      }
    });

    console.log('Created: ', data);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
