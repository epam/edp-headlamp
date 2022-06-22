export const rem = (pixels: number): string => {
    if (pixels > 0) {
        const base = 16; // html font-size
        const pixel = 1 / base;

        return `${pixel * pixels}rem`;
    }
    throw new Error(`incorrect passed value: ${pixels}`);
};
