import { isEqual, subtract, getMonthNames, convertToUTCDate, getGenderFromSalutation } from "../utils/ch-2";

describe('isEqual', () => {
  it('returns true when two dates are equal', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00.000Z');
    //Act
    const expected = isEqual(date1, date2);
    //Assert
    expect(expected).toBeTruthy();
  });

  it('returns false when two dates are not equal', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-02T00:00:00.000Z');
    //Act
    const expected = isEqual(date1, date2);
    //Assert
    expect(expected).toBeFalsy();
  });

  it('returns true when two dates have different time zones but represent the same moment', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T08:00:00.000+08:00');
    //Act
    const expected = isEqual(date1, date2);
    //Assert
    expect(expected).toBe(true);
  });

  it('returns false when two dates have different seconds', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:01.000Z');
    //Act
    const expected = isEqual(date1, date2);
    //Assert
    expect(expected).toBe(false);
  });
});

describe('subtract', () => {
  it('returns 0 when two dates are the same', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00.000Z');
    //Act
    const expected = subtract(date1, date2);
    //Assert
    expect(expected).toBe(0);
  });

  it('returns a positive number when Date1 is after Date2', () => {
    //Arrange
    const date1 = new Date('2022-01-02T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00.000Z');
    //Act
    const expected = subtract(date1, date2);
    //Assert
    expect(expected).toBe(86400000);
  });

  it('returns a negative number when Date1 is before Date2', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-02T00:00:00.000Z');
    //Act
    const expected = subtract(date1, date2);
    //Assert
    expect(expected).toBe(-86400000);
  });

  it('returns the correct difference when dates are in different time zones', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00.000+08:00');
    //Act
    const expected = subtract(date1, date2);
    //Assert
    expect(expected).toBe(28800000);
  });

  it('returns the correct difference when dates are compared with different precisions', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00Z');
    //Act
    const expected = subtract(date1, date2);
    //Assert
    expect(expected).toBe(0);
  });

  it('returns the correct difference when dates are a year apart', () => {
    //Arrange
    const date1 = new Date('2023-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00.000Z');
    //Act
    const expected = subtract(date1, date2);
    //Assert
    expect(expected).toBe(31536000000);
  });
});


describe('convertToUTCDate', () => {

  it('should convert a date string to UTC date string', () => {
    //Arrange
    const dateString = '2022-04-01T12:00:00Z';
    const expected = 'Fri, 01 Apr 2022 12:00:00 GMT';
    //Act
    const result = convertToUTCDate(dateString);
    //Assert
    expect(result).toEqual(expected);
  });


  it('should handle dates with no time component', () => {
    //Arrange
    const dateString = '2022-04-01';
    const expected = 'Fri, 01 Apr 2022 00:00:00 GMT';
    //Act
    const result = convertToUTCDate(dateString);
    //Assert
    expect(result).toEqual(expected);
  });

  it('should handle dates with timezones other than UTC', () => {
    //Arrange
    const dateString = '2022-04-01T12:00:00-07:00';
    const expected = 'Fri, 01 Apr 2022 19:00:00 GMT';
    //Act
    const result = convertToUTCDate(dateString);
    //Assert
    expect(result).toEqual(expected);
  });
});

describe('getMonthNames', () => {
  it('should return an array of month names from an array of date strings', () => {
    //Arrange
    const dateStrings = [
      '2022-01-01T00:00:00Z',
      '2022-02-01T00:00:00Z',
      '2022-03-01T00:00:00Z',
    ];
    const expected = ['January', 'February', 'March'];
    //Act
    const result = getMonthNames(dateStrings);
    //Assert
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should handle date strings with different formats', () => {
    //Arrange
    const dateStrings = [
      '01 January 2022',
      'Feb 01, 2022',
      '2022-03-01T00:00:00Z',
    ];
    const expected = ['January', 'February', 'March'];
    //Act
    const result = getMonthNames(dateStrings);
    //Assert
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should handle an empty array', () => {
    //Arrange
    const dateStrings: string[] = [];
    const expected: string[] = [];
    //Act
    const result = getMonthNames(dateStrings);
    //Assert
    expect(result).toEqual(expected);
  });

});

describe('getGenderFromSalutation', () => {
  it('should return to match /Male|Female/ for Mr.', () => {
    // Arrange 
    const input = 'Mr';
    const expected = /Male|Female/;
    // Act 
    const result = getGenderFromSalutation(input)
    //Assert
    expect(result).toMatch(expected);
  });

  it('should return to match /Male|Female/ for Ms.', () => {
    // Arrange 
    const input = 'Ms';
    const expected = /Male|Female/;
    // Act 
    const result = getGenderFromSalutation(input)
    //Assert
    expect(result).toMatch(expected);
  });

  it('should return to match /Male|Female/ for Mrs.', () => {
    // Arrange 
    const input = 'Mrs';
    const expected = /Male|Female/;
    // Act 
    const result = getGenderFromSalutation(input)
    //Assert
    expect(result).toMatch(expected);
  });

  it('returns "Male" when given "Mr"', () => {
    // Arrange 
    const input = 'Mr';
    const expected = 'Male'
    // Act 
    const result = getGenderFromSalutation(input)
    //Assert
    expect(result).toBe(expected);
  });

  it('returns "Female" when given "Ms"', () => {
    // Arrange 
    const input = 'Ms';
    const expected = 'Female'
    // Act 
    const result = getGenderFromSalutation(input)
    //Assert
    expect(result).toBe(expected);
  });

  it('returns "Female" when given "Mrs"', () => {
    // Arrange 
    const input = 'Mrs';
    const expected = 'Female'
    // Act 
    const result = getGenderFromSalutation(input)
    //Assert
    expect(result).toBe(expected);
  });


});