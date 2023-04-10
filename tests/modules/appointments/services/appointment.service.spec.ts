import sinon from 'sinon';
import * as AppointmentRepository from '@/modules/appointments/repository/appointment.repository';
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  getUserCreatedAppointments,
  updateAppointment
} from '@/modules/appointments/services/appointment.service';
import { Prisma } from '@prisma/client';
import { AppError } from '@/common/exceptions/appError';
import * as DateUtils from '@/utils/date';

describe('createAppointment', () => {
  afterEach(() => {
    sinon.restore();
  });

  test('it should return appointment object with the correct payload', async () => {
    // arrange
    const payload = {
      date: new Date('2021-04-07T10:00:00.000Z'),
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };

    const expectedPayload = {
      ...payload,
      date: new Date(payload.date)
    };
    const createAppointmentStub = sinon
      .stub(AppointmentRepository, 'createAppointment')
      .resolves(expectedPayload);

    // act
    await createAppointment(payload);

    // assert
    sinon.assert.calledOnce(createAppointmentStub);
    sinon.assert.calledWith(createAppointmentStub, expectedPayload);
  });

  test('it should throw an error when appointment creation fails', async () => {
    const payload = {
      date: '2023-04-07T10:00:00.000Z',
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };

    const errorMessage = 'Error while creating the appointment.';
    const createAppointmentStub = sinon
      .stub(AppointmentRepository, 'createAppointment')
      .rejects(new Error(errorMessage));

    // act
    const promise = createAppointment(payload);

    // assert
    await expect(promise).rejects.toThrow(errorMessage);
    sinon.assert.calledOnce(createAppointmentStub);
  });
});

describe('getUserCreatedAppointments', () => {
  afterEach(() => {
    sinon.restore();
  });

  test('it should return the user created appointments with correct payload', async () => {
    // arrange
    const payload = {
      userId: '1',
      limit: 10,
      page: 1,
      sortBy: 'id' as Prisma.AppointmentScalarFieldEnum,
      sortDir: 'asc' as Prisma.SortOrder
    };

    const expectedPayload = Object.values(payload);
    const getUserCreatedAppointmentsStub = sinon
      .stub(AppointmentRepository, 'getAppointmentsByUserId')
      .resolves([]);

    // act
    await getUserCreatedAppointments(payload);

    // assert
    sinon.assert.calledOnce(getUserCreatedAppointmentsStub);
    sinon.assert.calledWith(getUserCreatedAppointmentsStub, ...expectedPayload);
  });

  test('it should throw error with for non-existing appointment', async () => {
    // arrange
    const payload = {
      userId: '2',
      limit: 10,
      page: 1,
      sortBy: 'id' as Prisma.AppointmentScalarFieldEnum,
      sortDir: 'asc' as Prisma.SortOrder
    };

    const expectedPayload = Object.values(payload);
    const errorMessage = 'Failed';
    const getAppointmentsByUserIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentsByUserId')
      .rejects(new Error(errorMessage));

    // act
    const responsePromise = getUserCreatedAppointments(payload);

    // assert
    await expect(responsePromise).rejects.toThrow(errorMessage);
    sinon.assert.calledOnce(getAppointmentsByUserIdStub);

    // cleanup
    getAppointmentsByUserIdStub.restore();
  });
});

describe('getAppointment', () => {
  afterEach(() => {
    sinon.restore();
  });

  test('it should return the appointment if it exists and belongs to the user', async () => {
    // arrange
    const appointment = {
      id: '1',
      date: new Date('2023-04-07T10:00:00.000Z'),
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };

    const appointmentId = '1';
    const userId = 'John Doe';
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(appointment);

    // act
    const result = await getAppointment(appointmentId, userId);

    // assert
    expect(result).toEqual(appointment);
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
  });

  test('it should throw notFound if the appointment does not exist', async () => {
    // arrange
    const appointmentId = '1';
    const userId = 'John Doe';

    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(null);

    // act
    await expect(getAppointment(appointmentId, userId)).rejects.toThrow(
      AppError.notFound(
        `Appointment with Id ${appointmentId} could not be found.`
      )
    );

    // assert
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
  });

  test('it should throw notFound if the appointment does not belong to the user', async () => {
    // arrange
    const appointment = {
      id: '1',
      date: new Date('2023-04-07T10:00:00.000Z'),
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };

    const appointmentId = '1';
    const userId = 'Jim Doe';

    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(appointment);

    // act
    await expect(getAppointment(appointmentId, userId)).rejects.toThrow(
      AppError.notFound(
        `Appointment with Id ${appointmentId} could not be found.`
      )
    );

    // assert
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
  });

  test('it should throw the error thrown by AppointmentRepository.getAppointmentById', async () => {
    // arrange
    const appointmentId = '1';
    const userId = 'John Doe';

    const errorMessage = 'Something went wrong';
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .rejects(new Error(errorMessage));

    // act
    await expect(getAppointment(appointmentId, userId)).rejects.toThrow(
      new Error(errorMessage)
    );

    // assert
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
  });
});

describe('updateAppointment', () => {
  afterEach(() => {
    sinon.restore();
  });

  test('it should return updated appointment with the correct payload', async () => {
    // arrange
    const appointmentId = '1';

    const payload = {
      date: '2023-04-07T10:00:00.000Z',
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };
    const expectedPayload = {
      ...payload,
      date: new Date(payload.date)
    };
    const appointment = {
      id: appointmentId,
      ...payload,
      date: expectedPayload.date
    };
    const updateData = {
      ...payload,
      date: expectedPayload.date
    };
    const updateAppointmentStub = sinon
      .stub(AppointmentRepository, 'updateAppointmentById')
      .resolves({ count: 1 });

    const getCurrentDateStub = sinon
      .stub(DateUtils, 'getCurrentDate')
      .resolves('2023-03-07T10:00:00.000Z');
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(appointment);

    // act
    const result = await updateAppointment(appointmentId, payload);

    // assert
    expect(result).toBe(
      `Appointment with Id ${appointmentId} has been updated successfully.`
    );
    sinon.assert.calledOnce(getCurrentDateStub);
    sinon.assert.calledOnce(updateAppointmentStub);
    sinon.assert.calledWith(updateAppointmentStub, appointmentId, updateData);
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
  });

  test('it should throw an error when appointment does not exist', async () => {
    // arrange
    const appointmentId = '1';
    const payload = {
      date: '2023-04-07T10:00:00.000Z',
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(null);

    // act
    await expect(updateAppointment(appointmentId, payload)).rejects.toThrow(
      AppError.notFound(
        `Appointment with Id ${appointmentId} could not be found.`
      )
    );

    // assert
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
  });

  test('it should throw an error when appointment date is in the past', async () => {
    // arrange
    const appointmentId = '1';
    const payload = {
      date: '2021-04-07T10:00:00.000Z',
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };
    const appointment = {
      id: appointmentId,
      ...payload,
      date: new Date(payload.date)
    };
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(appointment);

    // act
    await expect(updateAppointment(appointmentId, payload)).rejects.toThrow(
      AppError.badRequest(
        `Past appointmets cannot be updated. Please check the appointment date before update.`
      )
    );

    // assert
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
  });

  test('it should throw an error when updating the appointment fails', async () => {
    // arrange
    const appointmentId = '1';
    const payload = {
      date: new Date('2023-04-07T10:00:00.000Z'),
      title: 'Updated Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };

    const appointment = {
      id: appointmentId,
      date: new Date('2023-04-07T12:00:00.000Z'),
      title: 'Test appointment',
      appointmentBy: 'John Doe',
      appointmentFor: 'Jane Doe'
    };

    const errorMessage =
      'Past appointmets cannot be updated. Please check the appointment date before update.';
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(appointment);

    const updateAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'updateAppointmentById')
      .rejects(new Error(errorMessage));

    sinon
      .stub(DateUtils, 'getCurrentDate')
      .resolves('2023-03-07T10:00:00.000Z');

    // act
    await expect(updateAppointment(appointmentId, payload)).rejects.toThrow(
      errorMessage
    );

    // assert
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledWith(getAppointmentByIdStub, appointmentId);
    sinon.assert.calledOnce(updateAppointmentByIdStub);
    sinon.assert.calledWith(
      updateAppointmentByIdStub,
      appointmentId,
      sinon.match(payload)
    );

    // Clean up
    getAppointmentByIdStub.restore();
    updateAppointmentByIdStub.restore();
  });
});

describe('deleteAppointment', () => {
  const appointmentId = '123';
  const userId = '456';

  afterEach(() => {
    sinon.restore();
  });

  test('it should return  successful message', async () => {
    // arrange
    const appointmentRepositoryStub = sinon
      .stub(AppointmentRepository, 'deleteAppointmentById')
      .resolves({});
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves({});

    // act
    const result = await deleteAppointment(appointmentId, userId);

    // assert
    sinon.assert.calledOnce(getAppointmentByIdStub);
    sinon.assert.calledOnceWithExactly(getAppointmentByIdStub, appointmentId);
    sinon.assert.calledOnceWithExactly(
      appointmentRepositoryStub,
      appointmentId,
      userId
    );
    expect(result).toBe(
      `Appointment with Id ${appointmentId} deleted successfully`
    );
  });

  test('it should throw a bad request error when appointment with given id is not available', async () => {
    // arrange
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves(null);

    // act
    await expect(deleteAppointment(appointmentId, userId)).rejects.toThrow(
      AppError.badRequest(
        `There is no appointments available with Id ${appointmentId}. Please check the appointment Id.`
      )
    );

    // assert
    sinon.assert.calledOnceWithExactly(getAppointmentByIdStub, appointmentId);
  });


  test('it should throw an error when deleting the appointment fails', async () => {
    // arrange
    const error = new Error('Database connection error');
    const appointmentRepositoryStub = sinon
      .stub(AppointmentRepository, 'deleteAppointmentById')
      .rejects(error);
    const getAppointmentByIdStub = sinon
      .stub(AppointmentRepository, 'getAppointmentById')
      .resolves({});

    // act
    await expect(deleteAppointment(appointmentId, userId)).rejects.toThrow(
      error
    );

    // assert
    sinon.assert.calledOnceWithExactly(getAppointmentByIdStub, appointmentId);
    sinon.assert.calledOnceWithExactly(
      appointmentRepositoryStub,
      appointmentId,
      userId
    );
  });
});
