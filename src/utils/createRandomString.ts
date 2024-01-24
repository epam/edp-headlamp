export const createRandomString = (
  stringLength: number = 5,
  stringChars: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
): string =>
  [...window.crypto.getRandomValues(new Uint32Array(stringLength))]
    .map((x) => stringChars[x % stringChars.length])
    .join('')
    .toLowerCase();
