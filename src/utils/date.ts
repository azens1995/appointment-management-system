export function isEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

export function subtract(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}

export function formatDate(date: Date, format: string) {
  if (date.toString() === 'Invalid Date') return '';
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const Mapper: { [key: string]: string | number } = {
    'yy': year.toString().substring(2),
    'yyyy': year,
    'yyy': year.toString().substring(1),
    'M': month,
    'MM': month.toString().padStart(2, '0'), // add leading zero if needed
    'MMM': getMonthName(month, true), // short month name
    'MMMM': getMonthName(month), // full month name,
    'd': day,
    'dd': day.toString().padStart(2, '0'),
    'ddd': getDayName(dayOfWeek, true),
    'dddd': getDayName(dayOfWeek),
    'h': hour % 12 || 12, // convert to 12-hour time and handle midnight
    'hh': (hour % 12 || 12).toString().padStart(2, '0'),
    'hhh': hour,
    'hhhh': hour.toString().padStart(2, '0'),
    'm': minutes,
    'mm': minutes.toString().padStart(2, '0'),
    's': seconds,
    'ss': seconds.toString().padStart(2, '0'),
    'p': hour > 11 ? 'PM' : 'AM',
  };

  // Replace each format code with the corresponding value
  return format.replace(/yyyy|yyy|yy|MMMM|MMM|MM|M|dddd|ddd|dd|d|hhhh|hhh|hh|h|mm|m|ss|s|p/g, (match: string) => Mapper[match] as string);
}

export function getMonthName(month: number, short = false) {
  const names = short
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return names[month - 1];
}

export function getDayName(day: number, short = false) {
  const names = short
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return names[day];
}

export function convertToUTCDate(dateString: string) {
  const date = new Date(dateString);
  return date.toUTCString();
}

export function getMonthNames(dateStrings: string[] ) {
  const months = dateStrings.map((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  });
  return months;
}