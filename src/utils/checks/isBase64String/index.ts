export const isBase64String = str => {
    // Check if the string is empty or contains non-base64 characters
    if (!str || /[^A-Za-z0-9+/=]/.test(str)) {
        return false;
    }

    // Check if the string length is a multiple of 4 (as base64 strings should be)
    if (str.length % 4 !== 0) {
        return false;
    }

    try {
        const decodedStr = atob(str);
        const nonPrintableCharacterRegex = /[\x00-\x08\x0E-\x1F]/;
        return !nonPrintableCharacterRegex.test(decodedStr);
    } catch (err) {
        // If atob throws an error, the input is not a valid base64 string
        return false;
    }
};
