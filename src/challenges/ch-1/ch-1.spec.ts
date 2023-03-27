import { calculateSimpleInterest } from './ch-1';

describe('Calculate Simple Interest', () => {
  test('it should return the simple interest with correct parameters', () => {
    // Arrange
    const principle = 1000;
    const time = 1;
    const rate = 1.1;
    const expectedValue = 11;
    // Act
    const simpleInterest = calculateSimpleInterest(principle, time, rate);
    // Assert
    expect(simpleInterest).toBe(expectedValue);
  });

  test('it should return positive value with positive parameter values', () => {
    // Arrange
    const principle = 2000;
    const time = 1.5;
    const rate = 1.2;
    // Act
    const simpleInterest = calculateSimpleInterest(principle, time, rate);
    // Assert
    expect(simpleInterest).not.toBeLessThanOrEqual(0);
  });
});
