import { calculateSimpleInterest } from './ch-1';

describe('Calculate Simple Interest', () => {
  test('it should return the simple interest with correct parameters', () => {
    // Arrange
    const principle = 1000;
    const time = 1;
    const rate = 1.1;
    const expectedValue = 11;
    // Act
    const SI = calculateSimpleInterest(principle, time, rate);
    // Assert
    expect(SI).toBe(expectedValue);
  });

  test('it should not return negative value.', () => {
    // Arrange
    const principle = 2000;
    const time = 1.5;
    const rate = 1.2;
    // Act
    const SI = calculateSimpleInterest(principle, time, rate);
    // Assert
    expect(SI).not.toBeLessThanOrEqual(0);
  });
});
