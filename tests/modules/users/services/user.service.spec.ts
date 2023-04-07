import { userSignup } from '@modules/users/services/user.service';
import * as UserRepositiory from '@modules/users/repository/user.repository';
import { AppError, HttpCode } from '@common/exceptions/appError';
import * as Mappers from '@modules/users/mappers/userResponseMapper';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSignin } from '@/modules/users/services/user.service';
import { getUsers } from '@/modules/users/services/user.service';

afterEach(() => {
  sinon.restore();
});

describe('userSignup', () => {
  const email = 'test@example.com';
  const password = 'testPassword';
  const payload = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email,
    password,
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown USA'
  };

  //Error case
  test('it should throw an error if user already exists', async () => {
    //Arrange
    const getExistingUserStub = sinon
      .stub(UserRepositiory, 'getExistingUser')
      .resolves(payload);
    //Act
    const responsePromise = userSignup(payload);
    //Assert
    await expect(responsePromise).rejects.toThrow(
      AppError.badRequest(`User already exists with email ${email}`)
    );
    sinon.assert.calledWith(getExistingUserStub, email);
  });

  //Success case
  test('it should call createUser with hashedPassword', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'getExistingUser').resolves(null);
    const hashedPassword = '@hashedPassword';
    sinon.stub(bcrypt, 'hash').resolves(hashedPassword);
    sinon.stub(Mappers, 'mapUserToUserResponse');
    const createUserStub = sinon
      .stub(UserRepositiory, 'createUser')
      .resolves(payload);
    //Act
    await userSignup(payload);
    //Assert
    sinon.assert.calledOnce(createUserStub);
    sinon.assert.calledWith(createUserStub, {
      ...payload,
      password: hashedPassword
    });
  });

  //Error case
  test('it should throw error if creating user fails', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'getExistingUser').resolves(null);
    const errorMessage = 'User creation failed';
    sinon
      .stub(UserRepositiory, 'createUser')
      .rejects(AppError.badRequest(errorMessage));
    //Act
    const responsePromise = userSignup(payload);
    //Assert
    await expect(responsePromise).rejects.toThrow(errorMessage);
  });

  //Success case
  test('it should not have "password" field in the returned data', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'getExistingUser').resolves(null);
    sinon.stub(UserRepositiory, 'createUser').resolves(payload);
    //Act
    const responsePromise = userSignup(payload);
    //Assert
    await expect(responsePromise).resolves.not.toHaveProperty('password');
  });
});

describe('userSignin', () => {
  const email = 'test@example.com';
  const password = 'testPassword';
  const payload = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email,
    password,
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown USA'
  };

  //Error case
  test('it should throw an error if user with given email does not exist', async () => {
    //Arrange
    const getExistingUserStub = sinon
      .stub(UserRepositiory, 'getExistingUser')
      .resolves(null);
    //Act
    const responsePromise = userSignin(payload);
    //Assert
    await expect(responsePromise).rejects.toThrow(
      AppError.badRequest(
        `User with email: ${email} is not registered in our system. Please use registered email to login into the system.`
      )
    );
    sinon.assert.calledWith(getExistingUserStub, email);
  });

  //Error case
  test('it should throw error if password and email does not match', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'getExistingUser').resolves(payload);
    sinon.stub(bcrypt, 'compare').resolves(false);
    //Act
    const responsePromise = userSignin(payload);
    //Assert
    await expect(responsePromise).rejects.toThrow(
      AppError.badRequest(
        `Email or password did not match. Please check your credentials`
      )
    );
  });

  //Success case
  test('it should call generate accessToken and refreshToken', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'getExistingUser').resolves(payload);
    sinon.stub(bcrypt, 'compare').resolves(true);
    const accessToken = 'accessToken mocked';
    const refreshToken = 'refreshToken mocked';
    sinon
      .stub(jwt, 'sign')
      .onFirstCall()
      .returns(accessToken)
      .onSecondCall()
      .returns(refreshToken);
    const loginResponseMapperStub = sinon.stub(Mappers, 'userLoginResponse');

    //Act
    await userSignin(payload);
    //Assert
    sinon.assert.calledWith(
      loginResponseMapperStub,
      payload,
      accessToken,
      refreshToken
    );
  });

  //Success case
  test('it should return object containing id, name and tokens', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'getExistingUser').resolves(payload);
    sinon.stub(bcrypt, 'compare').resolves(true);
    const accessToken = 'accessToken mocked';
    const refreshToken = 'refreshToken mocked';
    sinon
      .stub(jwt, 'sign')
      .onFirstCall()
      .returns(accessToken)
      .onSecondCall()
      .returns(refreshToken);

    const expectedData = {
      id: payload.id,
      name: `${payload.firstName} ${payload.lastName}`,
      accessToken,
      refreshToken
    };
    //Act
    const response = userSignin(payload);
    //Assert
    await expect(response).resolves.toMatchObject(expectedData);
  });
});

describe('getUsers', () => {
  const email = 'test@example.com';
  const password = 'testPassword';
  const expectedData = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email,
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown USA',
      isActive: true,
      isVerified: true,
      createdAt: '2023-04-06T11:23:45.276Z',
      updatedAt: '2023-04-06T11:23:45.276Z'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Emilie',
      email,
      phoneNumber: '523-456-110',
      address: '77 Gol Mont, Townany Nepal',
      isActive: true,
      isVerified: false,
      createdAt: '2023-04-06T11:23:45.276Z',
      updatedAt: '2023-04-06T11:23:45.276Z'
    }
  ];
  const users = [
    { ...expectedData[0], password },
    { ...expectedData[1], password }
  ];

  //Error case
  test('it should throw an error if fetchUser fails', async () => {
    //Arrange
    const errorMessage = "Couldn't fetch users";
    sinon
      .stub(UserRepositiory, 'fetchUser')
      .rejects(AppError.badRequest(errorMessage));
    //Act
    const responsePromise = getUsers();
    //Assert
    await expect(responsePromise).rejects.toThrow(errorMessage);
  });

  //Success case
  test('it should map users data proper response data', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'fetchUser').resolves(users);
    const mapUserStub = sinon.spy(Mappers, 'mapUserToUserResponse');
    //Act
    await getUsers();
    //Assert
    sinon.assert.calledTwice(mapUserStub);
  });

  //Success case
  test('it should return mapped user data without password', async () => {
    //Arrange
    sinon.stub(UserRepositiory, 'fetchUser').resolves(users);
    //Act
    const response = getUsers();
    //Assert
    await expect(response).resolves.toStrictEqual(expectedData);
  });
});
