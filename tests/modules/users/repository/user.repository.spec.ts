import { createUser } from '@modules/users/repository/user.repository';
import { prismaMock } from '@tests/prismaTestSetup';

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
    // Arrange
    const expectedUserData = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown USA',
      isActive: true,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCreate.mockResolvedValueOnce(expectedUserData as any);

    //Act
    const result = await createUser(mockUserData);

    //Assert
    expect(mockCreate).toHaveBeenCalledWith({ data: mockUserData });
    expect(result).toEqual(expectedUserData);
  });

  test('should throw an error if prisma.user.create throws an error', async () => {
    //Arrage
    const errorMessage = 'Failed to create user';
    mockCreate.mockRejectedValueOnce(new Error(errorMessage));

    //Act
    const result = createUser(mockUserData);

    //Assert
    await expect(result).rejects.toThrow(errorMessage);
  });
});
