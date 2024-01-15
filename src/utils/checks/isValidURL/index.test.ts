import { isValidURL } from './index';

describe('URL validation', () => {
    it('should return true for valid http url', () => {
        expect(isValidURL('http://google.com')).toBe(true);
    });

    it('should return true for valid https url', () => {
        expect(isValidURL('https://google.com')).toBe(true);
    });

    it('should return false for invalid url without http or https protocol', () => {
        expect(isValidURL('google.com')).toBe(false);
    });

    it('should return false for invalid url with incorrect syntax', () => {
        expect(isValidURL('htttttp://google')).toBe(false);
    });
});
