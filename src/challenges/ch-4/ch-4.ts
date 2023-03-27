export let AVAILABLE_TOKEN = 100;

export function setAvailableToken(token: number) {
  AVAILABLE_TOKEN = token;
}

export function getToken(
  onSuccess: (result: number) => void,
  onError: (err: Error) => void
) {
  if (AVAILABLE_TOKEN > 0) return onSuccess(AVAILABLE_TOKEN);
  else onError(new Error('Token not available!'));
}
