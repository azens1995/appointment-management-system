/**
 * Function for accepting promises.
 *
 * @returns Promise
 */
export function asyncFuncAccept() {
  return new Promise((accept, _) => {
    setTimeout(() => accept(100), 50);
  });
}

/**
 * Function for rejecting promises.
 *
 * @returns Promise
 */
export function asyncFuncReject() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Rejected!')), 50);
  });
}
