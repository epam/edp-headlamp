export const createVersioningString = (version: string, postfix: string): string =>
  !postfix ? version : `${version}-${postfix}`;
