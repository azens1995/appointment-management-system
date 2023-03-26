/**
 * Function to calculate simple interest.
 * @param principle number
 * @param time number
 * @param rate number
 *
 * @return simpleInterest number
 */
export function calculateSimpleInterest(
  principle: number,
  time: number,
  rate: number
) {
  const simpleInterest = (principle * time * rate) / 100;

  return simpleInterest;
}
