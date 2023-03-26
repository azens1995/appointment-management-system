import { calculateSimpleInterest } from './ch-1';

describe('Calculate Simple Interest', () => {
  test('it should pass the test cases', () => {
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

  test('it should not accept incorrect value', () => {
    // Arrange
    const principle = 2000;
    const time = 1.5;
    const rate = 1.2;
    const wrongValue = 35;

    // Act
    const SI = calculateSimpleInterest(principle, time, rate);

    // Assert
    expect(SI).not.toBe(wrongValue);
  });
});
