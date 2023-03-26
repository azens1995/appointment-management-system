import { calculateProfitPerYear } from './ch-5.util';
import { calculateProfit, createRandomUUID } from './ch-5';

jest.mock('./ch-5.util');
jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('Calculate Profit', () => {
  test('it should calculate profit value', () => {
    (calculateProfitPerYear as jest.Mock).mockReturnValueOnce(30);

    // Arrange
    const expectedValue = 30;
    // Act
    const res = calculateProfit();
    // Assert
    expect(res).toBe(expectedValue);
  });
});

describe('Test UUID generation', () => {
  test('it should generate random UUID.', () => {
    // Arrange
    const expected_value = '123456789';
    // Act
    const result = createRandomUUID();
    // Assert
    expect(result).toBe(expected_value);
  });

  test('it should be aware of bad value.', () => {
    // Arrange
    const bad_value = 'bad$123%41';
    // Act
    const result = createRandomUUID();
    // Assert
    expect(result).not.toBe(bad_value);
  });
});
