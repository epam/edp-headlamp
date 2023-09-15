export const safeDecode = (value: string, defaultValue: string = undefined) =>
    value ? atob(unescape(value)) : defaultValue;

export const safeEncode = (value: string) => btoa(unescape(value));
