export const capitalizeFirstLetter = (str: string): string => {
  if (str && str.length > 0) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
  if (str === null || str === undefined || str.length === 0) {
    return str;
  }
  throw new Error(`incorrect passed value: ${str}`);
};
