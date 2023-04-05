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

  test('should call prisma.user.create with the correct arguments', async () => {
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

    //Act
    const appointmentResult = await createAppointment(mockAppointmentData);

    //Assert
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

  test('should call prisma.appointment.updateMany with the correct arguments', async () => {
    // Arrange
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

    //Act
    const appointmentResult = await updateAppointmentById(
      '1',
      mockAppointmentData
    );

    //Assert
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
  test('should call prisma.appointment.findUnique with the correct argument', async () => {
    // Arrange
    mockFindUnique.mockResolvedValueOnce(mockAppointment as Appointment);

    // Act
    const result = await getAppointmentById('1');

    // Assert
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: '1' }
    });
    expect(result).toEqual(mockAppointment);
  });

  test('should return null if appointment does not exist', async () => {
    // Arrange
    mockFindUnique.mockResolvedValueOnce(null);

    // Act
    const result = await getAppointmentById('1');

    // Assert
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
  test('should call prisma.appointment.findMany with the correct arguments', async () => {
    // Arrange
    mockFindMany.mockResolvedValueOnce([mockAppointment] as Appointment[]);

    // Act
    const result = await getAppointmentsByUserId(
      '1',
      10,
      1,
      'createdAt',
      'desc'
    );

    // Assert
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
  test('should call prisma.appointment.findMany with the correct arguments', async () => {
    const mockUserId = '1';
    const mockLimit = 10;
    const mockPage = 1;
    const mockSortBy = 'date';
    const mockSortDir = 'asc';
    // Arrange
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

    // Act
    const appointmentResult = await getAppointmentForUserId(
      mockUserId,
      mockLimit,
      mockPage,
      mockSortBy as Prisma.AppointmentScalarFieldEnum,
      mockSortDir as Prisma.SortOrder
    );

    // Assert
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

  test('should call prisma.appointment.deleteMany with the correct arguments', async () => {
    // Arrange
    const appointmentId = '1';
    const userId = '1';

    // Act
    await deleteAppointmentById(appointmentId, userId);

    // Assert
    expect(mockDeleteMany).toHaveBeenCalledWith({
      where: { id: appointmentId, appointmentBy: userId }
    });
  });

  test('should return the deleted appointment', async () => {
    // Arrange
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

    // Act
    const result = await deleteAppointmentById(appointmentId, userId);

    // Assert
    expect(result).toEqual(expectedDeletedAppointment);
  });

  test('should return null if no appointment was deleted', async () => {
    // Arrange
    const appointmentId = '1';
    const userId = '1';

    mockDeleteMany.mockResolvedValueOnce(null);

    // Act
    const result = await deleteAppointmentById(appointmentId, userId);

    // Assert
    expect(result).toBeNull();
  });
});
