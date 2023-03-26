import { getToday } from "../utils/ch-7";

let mockDate: Date;

describe('Test Date mock', () => {
  beforeAll(() => {
    jest.useFakeTimers({});
    jest.setSystemTime(new Date('2020-02-01'));
    mockDate = new Date();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.advanceTimersByTime(20)
  })

  afterEach(() => {
    jest.advanceTimersByTime(10)
  })

  it('should return constant date advanced by 20ms from initial', () => {
    //Arrange and Act
    const currentDate = getToday();
    //Assert
    expect(currentDate.toISOString()).toEqual('2020-02-01T00:00:00.020Z');
  });

  it('should return constant date advanced by 50ms from initial', () => {
    //Arrange and Act
    const currentDate = getToday();
    //Assert
    expect(currentDate.toISOString()).toEqual('2020-02-01T00:00:00.050Z');
  });
});

test('After resetting the timer, should not match the mock Date 2020-02-01', () => {
  //Arrange and Act
  const currentDate = getToday();
  //Assert
  expect(currentDate.toISOString()).not.toEqual(mockDate);
})