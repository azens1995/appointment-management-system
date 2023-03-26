import { validatePassword } from './ch-3';

describe('it should validate your password', () => {
  test('it should throw error on minimum length', () => {
    // Arrange
    const password = 'test';
    const expectedError = 'Password length should not be less than 8.';

    // Act and Assert
    expect(() => validatePassword(password)).toThrow(expectedError);
  });

  test('it should return true on password validation pass', () => {
    // Arrange
    const password = 'test@123';
    const expectedValue = true;

    // Act
    const res = validatePassword(password);

    // Assert
    expect(res).toBe(expectedValue);
  });
});
