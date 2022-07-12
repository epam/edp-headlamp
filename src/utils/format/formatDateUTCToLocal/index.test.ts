import { formatDateUTCToLocal } from './index';

describe('checking formatDateUTCtoLocal', () => {
    test('checking formatDateUTCToLocal', () => {
        const testDate = '2022-07-12T06:02:17Z';
        const testLocaleLang = 'en-GB';

        expect(formatDateUTCToLocal(testDate, testLocaleLang)).toMatch('12/07/2022');
    });

    test('checking formatDateUTCToLocal with options', () => {
        const testDate = '2022-07-12T06:02:17Z';
        const testLocaleLang = 'en-GB';
        const testLocaleOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        expect(formatDateUTCToLocal(testDate, testLocaleLang, testLocaleOptions)).toMatch(
            'Tuesday, 12 July 2022'
        );
    });
});
