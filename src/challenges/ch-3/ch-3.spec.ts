import { validatePassword } from './ch-3';

describe('Password validation test', () => {
  test('it should throw error with password less than 8 characters', () => {
    // Arrange
    const password = 'test';
    const expectedError =
      'Password length should not be less than 8 characters.';
    // Act and Assert
    expect(() => validatePassword(password)).toThrow(expectedError);
  });

  test('it should return true with password more or equal to 8 characters', () => {
    // Arrange
    const password = 'test@123';
    // Act
    const res = validatePassword(password);
    // Assert
    expect(res).toBeTruthy();
  });
});
