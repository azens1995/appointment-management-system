import { getToken, setAvailableToken, AVAILABLE_TOKEN } from './ch-4';

describe('Token Util Test', () => {
  test('it should return success with available tokens', () => {
    // Arrage
    const onSuccessMock = jest.fn();
    const onErrorMock = jest.fn();
    //Act
    getToken(onSuccessMock, onErrorMock);
    //Assert
    expect(onSuccessMock).toHaveBeenCalledWith(AVAILABLE_TOKEN);
    expect(onErrorMock).not.toHaveBeenCalled();
  });

  test('it should call onSuccess callback only once', () => {
    // Arrage
    const onSuccessMock = jest.fn();
    //Act
    getToken(onSuccessMock, () => {});
    //Assert
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });

  test('it should call onSuccess callback with only one argument', () => {
    // Arrage
    const onSuccessMock = jest.fn();
    //Act
    getToken(onSuccessMock, () => {});
    //Assert
    expect(onSuccessMock.mock.calls[0].length).toBe(1);
  });

  test('it should call error callback when tokens are not avaialable', () => {
    // Arrage
    setAvailableToken(0); // set token count to 0 to simulate no tokens available
    const onSuccessMock = jest.fn();
    const onErrorMock = jest.fn();
    //Act
    getToken(onSuccessMock, onErrorMock);
    //Assert
    expect(onSuccessMock).not.toHaveBeenCalled();
    expect(onErrorMock).toHaveBeenCalledWith(new Error('Token not available!'));
  });

  test('it should call onError callback with only one argument', () => {
    // Arrage
    setAvailableToken(0);
    const onErrorMock = jest.fn();
    //Act
    getToken(() => {}, onErrorMock);
    //Assert
    expect(onErrorMock.mock.calls[0].length).toBe(1);
  });
});
