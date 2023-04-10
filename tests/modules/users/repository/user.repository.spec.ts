import {
  createUser,
  fetchUser,
  getExistingUser
} from '@/modules/users/repository/user.repository';
import { User } from '@prisma/client';
import { prismaMock } from '@tests/prismaTestSetup';

const mockDataStore = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown USA',
    isActive: true,
    isVerified: true,
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-05')
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '987-654-3210',
    address: '456 Oak St, Anytown USA',
    isActive: false,
    isVerified: true,
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-05')
  }
] as User[];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createUser function', () => {
  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown USA',
    isActive: true,
    isVerified: true,
    password: 'password123'
  };

  //@ts-ignore
  const mockCreate = prismaMock.user.create;

  test('it should return new user object with the correct arguments', async () => {
    //Arrange
    const expectedUserData = mockDataStore[0];
    mockCreate.mockResolvedValueOnce(expectedUserData);
    //Act
    const result = await createUser(mockUserData);
    //Assert
    expect(mockCreate).toHaveBeenCalledWith({ data: mockUserData });
    expect(result).toEqual(expectedUserData);
  });

  test('it should throw an error if user creation fails', async () => {
    //Arrange
    const errorMessage = 'Failed to create user';
    mockCreate.mockRejectedValueOnce(new Error(errorMessage));
    //Act
    const result = createUser(mockUserData);
    //Assert
    await expect(result).rejects.toThrow(errorMessage);
  });
});

describe('fetchUser function', () => {
  const mockFindMany = prismaMock.user.findMany;

  test('it should return the users list', async () => {
    //Arrange
    const mockData = mockDataStore;
    mockFindMany.mockResolvedValueOnce(mockData);
    //Act
    const result = await fetchUser();
    //Assert
    expect(mockFindMany).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test('it should throw an error if users list could not be fetched', async () => {
    //Arrange
    const errorMessage = 'Failed to fetch user data';
    mockFindMany.mockRejectedValueOnce(new Error(errorMessage));
    //Act
    const result = fetchUser();
    //Assert
    await expect(result).rejects.toThrow(errorMessage);
  });
});

describe('getExistingUser function', () => {
  const mockFindUnique = prismaMock.user.findUnique;

  test('it should return the existing user data with the given email', async () => {
    //Arrange
    const email = 'john.doe@example.com';
    const mockData = mockDataStore[0];
    mockFindUnique.mockResolvedValueOnce(mockData);
    //Act
    const result = await getExistingUser(email);
    //Assert
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { email } });
    expect(result).toEqual(mockData);
  });

  test('it should return null if user with given email is not found', async () => {
    //Arrange
    const email = 'jane.doe@example.com';
    mockFindUnique.mockResolvedValueOnce(null);
    //Act
    const result = await getExistingUser(email);
    //Assert
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { email } });
    expect(result).toBeNull();
  });

  test('it should throw an error if fetching user fails', async () => {
    //Arrange
    const email = 'jane.doe@example.com';
    const errorMessage = 'Failed to fetch existing user data';
    mockFindUnique.mockRejectedValueOnce(new Error(errorMessage));
    //Act
    const result = getExistingUser(email);
    //Assert
    await expect(result).rejects.toThrow(errorMessage);
  });
});
