import { asyncFuncAccept, asyncFuncReject } from './ch-6';

describe('Test asynchronous function', () => {
  test('it should call async function and accept the value.', async () => {
    // Arrange
    const expectedValue = 100;
    // Act
    const res = await asyncFuncAccept();
    // Assert
    expect(res).toBe(expectedValue);
  });

  test('it should call async function and reject the value.', async () => {
    // Arrange
    const expectedValue = 'Rejected!';
    // Act and Assert
    await expect(asyncFuncReject()).rejects.toThrow(expectedValue);
  });
});
