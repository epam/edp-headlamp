export const truncateName = (
  name: string,
  extraSubstrLength: number,
  maxLength: number = 63
): string => name.slice(0, maxLength - extraSubstrLength);
