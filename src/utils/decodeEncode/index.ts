import { isBase64String } from '../checks/isBase64String';

export const safeDecode = (value: string, defaultValue: string = undefined) => {
    try {
        return value ? atob(unescape(value)) : defaultValue;
    } catch (e) {
        console.error(e);
    }
};

export const safeEncode = (value: string) => {
    if (isBase64String(value)) {
        return value;
    }
    try {
        return btoa(unescape(value));
    } catch (e) {
        console.error(e);
    }
};
