export function isEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

export function subtract(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}

export function convertToUTCDate(dateString: string) {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return '';
  return date.toUTCString();
}

export function getMonthNames(dateStrings: string[]) {
  const months = dateStrings.map((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  });
  return months;
}

export function getGenderFromSalutation(salutation: 'Mr' | 'Ms' | 'Mrs'){
  if(salutation === 'Mr') return 'Male';
  else return 'Female';
}