import { isEqual, convertToUTCDate } from './ch-2';

describe('Date Util Test', () => {
  test('it should return true when two dates are equal', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00.000Z');
    //Act
    const result = isEqual(date1, date2);
    //Assert
    expect(result).toBeTruthy();
  });

  test('it should return false when two dates are not equal', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-02T00:00:00.000Z');
    //Act
    const result = isEqual(date1, date2);
    //Assert
    expect(result).toBeFalsy();
  });
});

describe('Date Util Test to Convert UTC Date String', () => {
  test('should convert a date string to UTC date string', () => {
    //Arrange
    const dateString = '2022-04-01T12:00:00Z';
    const expected = 'Fri, 01 Apr 2022 12:00:00 GMT';
    //Act
    const result = convertToUTCDate(dateString);
    //Assert
    expect(result).toEqual(expected);
  });

  test('should handle dates with no time component', () => {
    //Arrange
    const dateString = '2022-04-01';
    const expected = 'Fri, 01 Apr 2022 00:00:00 GMT';
    //Act
    const result = convertToUTCDate(dateString);
    //Assert
    expect(result).toEqual(expected);
  });

  test('should handle dates with timezones other than UTC', () => {
    //Arrange
    const dateString = '2022-04-01T12:00:00-07:00';
    const expected = 'Fri, 01 Apr 2022 19:00:00 GMT';
    //Act
    const result = convertToUTCDate(dateString);
    //Assert
    expect(result).toEqual(expected);
  });
});
