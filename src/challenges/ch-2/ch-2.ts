export function isEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

export function convertToUTCDate(dateString: string) {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return '';
  return date.toUTCString();
}
