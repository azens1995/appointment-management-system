import { v4 as uuidv4 } from 'uuid';
import { calculateProfitPerYear } from './ch-5.util';

/**
 * Function to calculate Profit value.
 *
 * @returns number
 */
export function calculateProfit() {
  const profitPerYear = calculateProfitPerYear();

  return profitPerYear;
}

/**
 * Function to generate random uuid.
 *
 * @returns string
 */
export const createRandomUUID = () => {
  return uuidv4();
};
