import { Prisma } from '@prisma/client';

export interface GetUserCreatedAppointmentPayload {
  userId: string;
  limit?: number;
  page?: number;
  sortBy?: Prisma.AppointmentScalarFieldEnum;
  sortDir?: Prisma.SortOrder;
}
