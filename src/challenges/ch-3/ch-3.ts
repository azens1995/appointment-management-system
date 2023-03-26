/**
 * Function to validate your password.
 * @param password string
 *
 * @returns Error | true
 */
export function validatePassword(password: string) {
  if (password.length < 8) {
    throw Error('Password length should not be less than 8 characters.');
  }
  return true;
}
