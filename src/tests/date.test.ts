import { formatDate, isEqual, subtract, getDayName, getMonthName, getMonthNames, convertToUTCDate } from "../utils/date";

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

  it('returns true when two dates are compared with different precisions', () => {
    //Arrange
    const date1 = new Date('2022-01-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00Z');
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

  it('returns the correct difference when dates are 6 months apart', () => {
    //Arrange
    const date1 = new Date('2022-07-01T00:00:00.000Z');
    const date2 = new Date('2022-01-01T00:00:00.000Z');
    //Act
    const expected = subtract(date1,date2);
    //Assert
    expect(expected).toBe(15638400000);
  });
});

describe('getDayName', () => {
  it('should return "Sunday" for day 0', () => {
    expect(getDayName(0)).toEqual('Sunday');
  });


  it('should return "Tue" for day 2 and short=true', () => {
    //Arrage and Act
    const expected =getDayName(2, true);
    //Assert
    expect(expected).toEqual('Tue');
  });

  it('should not return "Wednesday" when short=true for day 3', () => {
    //Arrage and Act
    const expected =getDayName(3, true);
    //Assert
    expect(expected).not.toEqual('Wednesday');
  });
});



describe('getMonthName', () => {
  test('returns January for month 1', () => {
    expect(getMonthName(1)).toBe('January');
  });

  test('returns short month name for month 5', () => {
    expect(getMonthName(5, true)).toBe('May');
  });

  test('returns full month name for month 12', () => {
    expect(getMonthName(12)).toBe('December');
  });
});

describe('formatDate', () => {
  test('returns empty string for invalid date', () => {
    expect(formatDate(new Date('invalid'), 'yyyy/MM/dd')).toBe('');
  });

  test('formats year', () => {
    const date = new Date(2023, 0, 1);
    expect(formatDate(date, 'yy')).toBe('23');
    expect(formatDate(date, 'yyyy')).toBe('2023');
    expect(formatDate(date, 'yyy')).toBe('023');
  });

  test('formats month', () => {
    const date = new Date(2023, 5, 1);
    expect(formatDate(date, 'M')).toBe('6');
    expect(formatDate(date, 'MM')).toBe('06');
    expect(formatDate(date, 'MMM')).toBe('Jun');
    expect(formatDate(date, 'MMMM')).toBe('June');
  });

  test('formats day', () => {
    const date = new Date(2023, 0, 5);
    expect(formatDate(date, 'd')).toBe('5');
    expect(formatDate(date, 'dd')).toBe('05');
  });

  test('formats hour 12-hour format', () => {
    const date = new Date(2023, 0, 1, 13);
    expect(formatDate(date, 'h')).toBe('1');
    expect(formatDate(date, 'hh')).toBe('01');
    expect(formatDate(date, 'p')).toBe('PM');
  });
  test('formats hour 24-hour format', () => {
    const date = new Date(2023, 0, 1, 13);
    expect(formatDate(date, 'hhh')).toBe('13');
    expect(formatDate(date, 'hhhh')).toBe('13');
  });

  test('formats minutes', () => {
    const date = new Date(2023, 0, 1, 0, 3);
    expect(formatDate(date, 'm')).toBe('3');
    expect(formatDate(date, 'mm')).toBe('03');
  });

  test('formats seconds', () => {
    const date = new Date(2023, 0, 1, 0, 0, 7);
    expect(formatDate(date, 's')).toBe('7');
    expect(formatDate(date, 'ss')).toBe('07');
  });

  test('formats combination of codes', () => {
    const date = new Date(2023, 0, 1, 13, 30, 45);
    expect(formatDate(date, 'yyyy/MM/dd h:mm:ss p')).toBe('2023/01/01 1:30:45 PM');
  });

  test('handles single-letter codes', () => {
    const date = new Date(2023, 5, 1, 13, 30, 45);
    expect(formatDate(date, 'M/d/h/m/s p')).toBe('6/1/1/30/45 PM');
  });

  test('handles lowercase codes', () => {
    const date = new Date(2023, 5, 1, 13, 30, 45);
    expect(formatDate(date, 'yyyy/mm/dd')).toBe('2023/30/01');
  });

  test('handles invalid codes', () => {
    const date = new Date(2023, 0, 1);
    expect(formatDate(date, 'not-a-year')).toBe('not-a-year');
  })
})


describe('convertToUTCDate', () => {
  it('should match a date string to date regex', () => {
    const dateString = '2022-04-01T12:00:00Z';
    const expectedMatchString = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
    const result = convertToUTCDate(dateString);
    expect(result).toMatch(expectedMatchString);
  });

  it('should convert a date string to UTC date string', () => {
    const dateString = '2022-04-01T12:00:00Z';
    const expected = 'Fri, 01 Apr 2022 12:00:00 GMT';
    const result = convertToUTCDate(dateString);
    expect(result).toEqual(expected);
  });


  it('should handle dates with no time component', () => {
    const dateString = '2022-04-01';
    const expected = 'Fri, 01 Apr 2022 00:00:00 GMT';
    const result = convertToUTCDate(dateString);
    expect(result).toEqual(expected);
  });

  it('should handle dates with timezones other than UTC', () => {
    const dateString = '2022-04-01T12:00:00-07:00';
    const expected = 'Fri, 01 Apr 2022 19:00:00 GMT';
    const result = convertToUTCDate(dateString);
    expect(result).toEqual(expected);
  });
});

describe('getMonthNames', () => {
  it('should return an array of month names from an array of date strings', () => {
    const dateStrings = [
      '2022-01-01T00:00:00Z',
      '2022-02-01T00:00:00Z',
      '2022-03-01T00:00:00Z',
    ];
    const expected = ['January', 'February', 'March'];
    const result = getMonthNames(dateStrings);
    expect(result).toContain(expected[0]);
    expect(result).toContain(expected[1]);
    expect(result).toContain(expected[3]);
  });

  it('should handle date strings with different formats', () => {
    const dateStrings = [
      '01 January 2022',
      'Feb 01, 2022',
      '2022-03-01T00:00:00Z',
    ];
    const expected = ['January', 'February', 'March'];
    const result = getMonthNames(dateStrings);
    expect(result).toEqual(expected);
  });

  it('should handle an empty array', () => {
    const dateStrings: string[] = [];
    const expected:string[] = [];
    const result = getMonthNames(dateStrings);
    expect(result).toEqual(expected);
  });
});