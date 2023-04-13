export const createURLObjectFromURLOrigin = (urlOrigin: string) => {
    if (!urlOrigin) {
        throw new Error(`URL Origin should be a string`);
    }

    return new URL(urlOrigin);
};
