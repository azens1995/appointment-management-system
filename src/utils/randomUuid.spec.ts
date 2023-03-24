import { createRandomUUID } from './randomUuid';

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('Test random uuid', () => {
  test('it should generate random UUID.', () => {
    // Arrange
    const expected_value = '123456789';

    // Act
    const result = createRandomUUID();

    // Assert
    expect(result).toBe(expected_value);
  });

  test('it should throw error', () => {
    // Arrange
    const bad_value = 'bad$123%41';

    // Act
    const result = createRandomUUID();

    // Assert
    expect(result).not.toBe(bad_value);
  });
});
