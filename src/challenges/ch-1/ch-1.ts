/**
 * Function to calculate simple interest.
 * @param principle number
 * @param time number
 * @param rate number
 *
 * @return SI (Simple Interest) number
 */
export function calculateSimpleInterest(
  principle: number,
  time: number,
  rate: number
) {
  const SI = (principle * time * rate) / 100;

  return SI;
}
