import {
  createUser,
  fetchUser,
  getExistingUser
} from '@modules/users/repository/user.repository';
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
    createdAt: new Date(),
    updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date()
  }
] as User[];

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call prisma.user.create with the correct arguments', async () => {
    //Arrange
    const expectedUserData = mockDataStore[0];
    mockCreate.mockResolvedValueOnce(expectedUserData);
    //Act
    const result = await createUser(mockUserData);
    //Assert
    expect(mockCreate).toHaveBeenCalledWith({ data: mockUserData });
    expect(result).toEqual(expectedUserData);
  });

  test('should throw an error if prisma.user.create throws an error', async () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call prisma.user.findMany and return the user data', async () => {
    //Arrange
    const mockData = mockDataStore;
    mockFindMany.mockResolvedValueOnce(mockData);
    //Act
    const result = await fetchUser();
    //Assert
    expect(mockFindMany).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test('should throw an error if prisma.user.findMany throws an error', async () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call prisma.user.findUnique with the given email and return the existing user data', async () => {
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

  test('should return null if prisma.user.findUnique returns null', async () => {
    //Arrange
    const email = 'jane.doe@example.com';
    mockFindUnique.mockResolvedValueOnce(null);
    //Act
    const result = await getExistingUser(email);
    //Assert
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { email } });
    expect(result).toBeNull();
  });

  test('should throw an error if prisma.user.findUnique throws an error', async () => {
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
