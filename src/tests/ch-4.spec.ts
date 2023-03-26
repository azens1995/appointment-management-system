import { getToken, setAvailableToken, AVAILABLE_TOKEN } from "../utils/ch-4";

describe('getToken', () => {

  it('calls onSuccess callback with token count when tokens are available', () => {
    // Arrage
    const onSuccessMock = jest.fn();
    const onErrorMock = jest.fn();

    //Act
    getToken(onSuccessMock, onErrorMock);

    //Assert
    expect(onSuccessMock).toHaveBeenCalledWith(AVAILABLE_TOKEN);
    expect(onErrorMock).not.toHaveBeenCalled();
  });

  it('calls onSuccess callback only one times', () => {
    // Arrage
    const onSuccessMock = jest.fn();

    //Act
    getToken(onSuccessMock, () => { });

    //Assert
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSuccess callback with only one argument', () => {
    // Arrage
    const onSuccessMock = jest.fn();

    //Act
    getToken(onSuccessMock, () => { });

    //Assert
    expect(onSuccessMock.mock.calls[0].length).toBe(1);
  });



  it('calls onError callback with error message when tokens are not available', () => {
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

  it('calls onError callback with only one argument', () => {
    // Arrage
    setAvailableToken(0);
    const onErrorMock = jest.fn();

    //Act
    getToken(() => { }, onErrorMock);

    //Assert
    expect(onErrorMock.mock.calls[0].length).toBe(1);
  });
});