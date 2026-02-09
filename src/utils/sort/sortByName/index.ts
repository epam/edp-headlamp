export const sortByName = (a?: string, b?: string): number => {
  if (a && b) {
    return a.localeCompare(b, undefined, { sensitivity: 'accent' });
  }

  if (a && !b) {
    return -1;
  }

  if (!a && b) {
    return 1;
  }

  return 0;
};
