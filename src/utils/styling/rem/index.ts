export const rem = (pixels: number): string => {
  const base = 16; // html font-size
  const pixel = 1 / base;

  return `${pixel * pixels}rem`;
};
