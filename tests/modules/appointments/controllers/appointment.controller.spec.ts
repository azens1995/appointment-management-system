import { Response, NextFunction, Request } from 'express';
import sinon from 'sinon';
import * as appointmentService from '@/modules/appointments/services/appointment.service';
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  getUserCreatedAppointments,
  updateAppointment
} from '@/modules/appointments/controllers/appointment.controller';
import { HttpCode } from '@/common/exceptions/appError';
import { RequestWithUser } from '@/common/interfaces/express.interface';
import { Result } from '@/common/core/Result';

describe('getUserCreatedAppointments', () => {
  let appointmentServiceStub: sinon.SinonStub;
  let reqWithUser: RequestWithUser;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    appointmentServiceStub = sinon.stub(
      appointmentService,
      'getUserCreatedAppointments'
    );
    reqWithUser = {
      user: { id: 'test_user_id' }
    } as unknown as RequestWithUser;
    req = {} as Request;
    res = {
      status: sinon.stub().returns({
        json: sinon.stub()
      })
    } as unknown as Response;
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  test('it should return user created appointments successfully', async () => {
    // arrange
    const mockResponseData = [
      { id: 'test_appointment_id', title: 'test_appointment' }
    ];
    const payload = { userId: 'test_user_id' };
    appointmentServiceStub.resolves(mockResponseData);

    // act
    await getUserCreatedAppointments(reqWithUser, res, next);

    // assert
    sinon.assert.calledWith(appointmentServiceStub, payload);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, HttpCode.OK);
    sinon.assert.calledOnce(res.status(200).json);
    sinon.assert.calledWith(res.status(200).json, Result.ok(mockResponseData));
  });
});

describe('createAppointment', () => {
  let req: Request;
  let reqWithUser: RequestWithUser;
  let res: Response;
  let next: NextFunction;
  let appointmentServiceStub: sinon.SinonStub;

  beforeEach(() => {
    req = {
      body: {
        startDateTime: new Date('2022-01-01T00:00:00.000Z'),
        endDateTime: new Date('2022-01-01T01:00:00.000Z'),
        title: 'Test Appointment'
      }
    } as Request;

    reqWithUser = {
      user: {
        id: 'user-id-123'
      },
      ...req
    } as unknown as RequestWithUser;

    res = {
      status: sinon.stub().returns({
        json: sinon.stub()
      })
    } as unknown as Response;

    next = sinon.stub() as NextFunction;

    appointmentServiceStub = sinon.stub(
      appointmentService,
      'createAppointment'
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  test('it should return created appointment with appointment dto', async () => {
    // arrange
    const appointmentData = {
      id: 'appointment-id-123',
      startDateTime: new Date('2022-01-01T00:00:00.000Z'),
      endDateTime: new Date('2022-01-01T01:00:00.000Z'),
      title: 'Test Appointment',
      appointmentBy: 'user-id-123'
    };

    appointmentServiceStub
      .withArgs({
        startDateTime: new Date('2022-01-01T00:00:00.000Z'),
        endDateTime: new Date('2022-01-01T01:00:00.000Z'),
        title: 'Test Appointment',
        appointmentBy: 'user-id-123'
      })
      .resolves(appointmentData);

    // act
    await createAppointment(reqWithUser, res, next);

    // assert
    sinon.assert.calledWith(appointmentServiceStub, {
      startDateTime: new Date('2022-01-01T00:00:00.000Z'),
      endDateTime: new Date('2022-01-01T01:00:00.000Z'),
      title: 'Test Appointment',
      appointmentBy: 'user-id-123'
    });
    sinon.assert.calledWith(res.status, HttpCode.CREATED);
    sinon.assert.calledWith(res.status(200).json, Result.ok(appointmentData));
  });
});

describe('getAppointment', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: { id: '1' },
      user: { id: '123' }
    } as unknown as Request;
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as Response;
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  test('it should return appointment with valid user id and appointment id', async () => {
    // arrange
    const appointment = {
      id: '1',
      name: 'Appointment 1',
      isSuccess: true,
      isFailure: false,
      error: null
    };
    const appointmentServiceStub = sinon
      .stub(appointmentService, 'getAppointment')
      .resolves(appointment);

    // act
    await getAppointment(req, res, next);

    // Assert
    sinon.assert.calledWithExactly(appointmentServiceStub, '1', '123');
    sinon.assert.calledWithExactly(res.status, HttpCode.OK);
    sinon.assert.calledWithExactly(res.json, Result.ok(appointment));
    sinon.assert.notCalled(next);
  });
});

describe('deleteAppointment', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let deleteAppointmentStub: sinon.SinonStub;

  beforeEach(() => {
    req = {
      params: { id: '123' },
      user: { id: '456' }
    } as unknown as RequestWithUser;
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as Response;
    next = sinon.stub() as NextFunction;
    deleteAppointmentStub = sinon.stub(appointmentService, 'deleteAppointment');
  });

  afterEach(() => {
    sinon.restore();
  });

  test('it should return success when valid id given', async () => {
    // arrange
    const deletedAppointment = {
      id: '123',
      title: 'Appointment 1',
      start: new Date(),
      end: new Date()
    };

    // act
    deleteAppointmentStub.resolves(deletedAppointment);
    const resp = await deleteAppointment(req, res, next);

    // assert
    sinon.assert.calledOnceWithExactly(deleteAppointmentStub, '123', '456');
    sinon.assert.calledOnceWithExactly(res.status, HttpCode.OK);
    sinon.assert.calledWithExactly(res.json, Result.ok(deletedAppointment));
  });
});

describe('updateAppointment', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let updateAppointmentStub: sinon.SinonStub;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    } as unknown as Response;
    next = sinon.stub() as NextFunction;
    updateAppointmentStub = sinon.stub(appointmentService, 'updateAppointment');
  });

  afterEach(() => {
    sinon.restore();
  });

  test('it should return success message when valid appointment id and payload', async () => {
    //arrange
    const updatedAppointment = {
      id: '123',
      title: 'Appointment Updated',
      description: 'Description Updated',
      appointmentBy: '456'
    };
    const expectedResult = Result.ok(updatedAppointment);
    updateAppointmentStub.resolves(updatedAppointment);

    req.params = { id: '123' };
    (req as RequestWithUser).user = { id: '456' };
    req.body = {
      title: 'Appointment Updated',
      description: 'Description Updated'
    };

    // act
    const resp = await updateAppointment(req, res, next);

    // assert
    sinon.assert.calledOnceWithExactly(updateAppointmentStub, '123', {
      title: 'Appointment Updated',
      description: 'Description Updated',
      appointmentBy: '456'
    });
    sinon.assert.calledOnceWithExactly(res.status, HttpCode.OK);
    sinon.assert.calledOnceWithExactly(res.json, expectedResult);
    sinon.assert.notCalled(next);
  });
});
