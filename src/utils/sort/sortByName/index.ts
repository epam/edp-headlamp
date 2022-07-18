export const sortByName = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { sensitivity: 'accent' });
