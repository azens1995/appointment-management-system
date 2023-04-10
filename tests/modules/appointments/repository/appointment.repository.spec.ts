import { prismaMock } from '@tests/prismaTestSetup';
import { Appointment, Prisma } from '@prisma/client';
import {
  createAppointment,
  deleteAppointmentById,
  getAppointmentById,
  getAppointmentForUserId,
  getAppointmentsByUserId,
  updateAppointmentById
} from '@modules/appointments/repository/appointment.repository';

describe('createAppointment', () => {
  const mockAppointmentData: Prisma.AppointmentUncheckedCreateInput = {
    title: 'Hello',
    date: new Date(),
    appointmentBy: '1',
    appointmentFor: '1'
  };

  //@ts-ignore
  const appointmentMockCreate = prismaMock.appointment.create;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should create user with the correct arguments', async () => {
    // arrange
    const expectedAppointMentData: Prisma.AppointmentUncheckedCreateInput = {
      id: '1',
      title: 'Hello',
      date: new Date(),
      appointmentBy: '1',
      appointmentFor: '1'
    };

    appointmentMockCreate.mockResolvedValueOnce(
      expectedAppointMentData as Appointment
    );

    // act
    const appointmentResult = await createAppointment(mockAppointmentData);

    // assert
    expect(appointmentResult).toBeDefined();
    expect(appointmentMockCreate).toHaveBeenCalledWith({
      data: mockAppointmentData
    });
    expect(appointmentResult).toHaveProperty('id');
  });
});
describe('updateAppointment', () => {
  const mockAppointmentData: Prisma.AppointmentUncheckedCreateInput = {
    title: 'Hello',
    date: new Date(),
    appointmentBy: '1',
    appointmentFor: '1'
  };

  //@ts-ignore
  const appointmentMockUpdateMany = prismaMock.appointment.updateMany;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should call prisma.appointment.updateMany with the correct arguments', async () => {
    // arrange
    const expectedAppointment = {
      id: '1',
      title: 'Hello',
      date: new Date(),
      appointmentBy: '1',
      appointmentFor: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    appointmentMockUpdateMany.mockResolvedValueOnce(
      expectedAppointment as Prisma.PromiseReturnType<any>
    );

    // act
    const appointmentResult = await updateAppointmentById(
      '1',
      mockAppointmentData
    );

    // assert
    expect(appointmentMockUpdateMany).toHaveBeenCalledWith({
      where: { id: '1', appointmentBy: '1' },
      data: mockAppointmentData
    });
    expect(appointmentResult).toEqual(expectedAppointment);
  });
});
describe('findById', () => {
  const mockAppointment: Prisma.AppointmentUncheckedCreateInput = {
    id: '1',
    title: 'Hello',
    date: new Date(),
    appointmentBy: '1',
    appointmentFor: '1'
  };

  //@ts-ignore
  const mockFindUnique = prismaMock.appointment.findUnique;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it should find appointment with the correct argument', async () => {
    // arrange
    mockFindUnique.mockResolvedValueOnce(mockAppointment as Appointment);

    // act
    const result = await getAppointmentById('1');

    // assert
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: '1' }
    });
    expect(result).toEqual(mockAppointment);
  });

  test('it should return null if appointment does not exist', async () => {
    // arrange
    mockFindUnique.mockResolvedValueOnce(null);

    // act
    const result = await getAppointmentById('1');

    // assert
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: '1' }
    });
    expect(result).toBeNull();
  });
});

describe('getAppointmentByUserId', () => {
  const mockAppointment: Prisma.AppointmentUncheckedCreateInput = {
    id: '1',
    title: 'Hello',
    date: new Date(),
    appointmentBy: '1',
    appointmentFor: '1'
  };

  //@ts-ignore
  const mockFindMany = prismaMock.appointment.findMany;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it should find user by id provided', async () => {
    // arrange
    mockFindMany.mockResolvedValueOnce([mockAppointment] as Appointment[]);

    // act
    const result = await getAppointmentsByUserId(
      '1',
      10,
      1,
      'createdAt',
      'desc'
    );

    // assert
    expect(mockFindMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      where: { appointmentBy: '1' },
      take: 10,
      skip: 0
    });
    expect(result).toEqual([mockAppointment]);
  });
});
describe('getAppointmentById', () => {
  //@ts-ignore
  const mockFindMany = prismaMock.appointment.findMany;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it should get appointment by id with the correct arguments provided', async () => {
    const mockUserId = '1';
    const mockLimit = 10;
    const mockPage = 1;
    const mockSortBy = 'date';
    const mockSortDir = 'asc';
    // arrange
    const expectedAppointment = [
      {
        id: '1',
        title: 'Mock appointment 1',
        date: new Date('2022-01-01T00:00:00.000Z'),
        appointmentBy: '2',
        appointmentFor: '1'
      },
      {
        id: '2',
        title: 'Mock appointment 2',
        date: new Date('2022-02-01T00:00:00.000Z'),
        appointmentBy: '3',
        appointmentFor: '1'
      }
    ];

    mockFindMany.mockResolvedValueOnce(expectedAppointment as Appointment[]);

    // act
    const appointmentResult = await getAppointmentForUserId(
      mockUserId,
      mockLimit,
      mockPage,
      mockSortBy as Prisma.AppointmentScalarFieldEnum,
      mockSortDir as Prisma.SortOrder
    );

    // assert
    expect(mockFindMany).toHaveBeenCalledWith({
      orderBy: { [mockSortBy]: mockSortDir },
      where: { appointmentFor: mockUserId },
      take: mockLimit,
      skip: (mockPage - 1) * mockLimit
    });
    expect(appointmentResult).toEqual(expectedAppointment);
  });
});

describe('deleteAppointmentById', () => {
  //@ts-ignore
  const mockDeleteMany = prismaMock.appointment.deleteMany;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should call delete appointment when the correct arguments provided', async () => {
    // arrange
    const appointmentId = '1';
    const userId = '1';

    // act
    await deleteAppointmentById(appointmentId, userId);

    // assert
    expect(mockDeleteMany).toHaveBeenCalledWith({
      where: { id: appointmentId, appointmentBy: userId }
    });
  });

  test('it should return the deleted appointment', async () => {
    // arrange
    const appointmentId = '1';
    const userId = '1';
    const expectedDeletedAppointment = {
      id: appointmentId,
      title: 'Hello',
      date: new Date(),
      appointmentBy: userId,
      appointmentFor: '2'
    };

    mockDeleteMany.mockResolvedValueOnce(expectedDeletedAppointment as any);

    // act
    const result = await deleteAppointmentById(appointmentId, userId);

    // assert
    expect(result).toEqual(expectedDeletedAppointment);
  });

  test('it should return null if no appointment was deleted', async () => {
    // arrange
    const appointmentId = '1';
    const userId = '1';

    mockDeleteMany.mockResolvedValueOnce(null);

    // act
    const result = await deleteAppointmentById(appointmentId, userId);

    // assert
    expect(result).toBeNull();
  });
});
