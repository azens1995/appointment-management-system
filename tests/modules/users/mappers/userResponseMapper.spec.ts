import sinon from 'sinon';
import * as Mappers from '@modules/users/mappers/userResponseMapper';

describe('mapUserToUserResponse', () => {
  test('it should map a user to a user response', () => {
    //Arrange
    const user = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      password: 'jon*secret',
      address: '123 Main St, Anytown USA',
      isActive: true,
      isVerified: false,
      createdAt: new Date('2022-01-01T00:00:00Z'),
      updatedAt: new Date('2022-01-02T00:00:00Z')
    };

    const expectedResponse = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown USA',
      isActive: true,
      isVerified: false,
      createdAt: new Date('2022-01-01T00:00:00Z'),
      updatedAt: new Date('2022-01-02T00:00:00Z')
    };
    //Act
    const actualResponse = Mappers.mapUserToUserResponse(user);
    //Assert
    sinon.assert.match(actualResponse, expectedResponse);
    expect(actualResponse).not.toHaveProperty('password');
  });
});

describe('userLoginResponse', () => {
  test('it should return a LoginResponse object with the correct properties', () => {
    //Arrange
    const user = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      password: 'john*secret',
      email: 'john.doe@email.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown USA',
      isActive: true,
      isVerified: true,
      createdAt: new Date('2023-04-06T11:23:45.276Z'),
      updatedAt: new Date('2023-04-06T11:23:45.276Z')
    };
    const accessToken = 'access_token';
    const refreshToken = 'refresh_token';
    const expectedResult = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      accessToken,
      refreshToken
    };
    //Act
    const result = Mappers.userLoginResponse(user, accessToken, refreshToken);
    //Assert
    sinon.assert.match(result, expectedResult);
  });
});
