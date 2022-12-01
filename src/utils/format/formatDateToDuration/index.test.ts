import { formatDateToDuration } from './index';

describe('checking formatDateToDuration', () => {
    it('should return correct duration string', () => {
        const startDate = '2022-12-01T14:21:12Z';
        const endDate = '2022-12-01T14:21:28Z';

        const duration = formatDateToDuration(startDate, endDate);
        expect(duration).toBe('16s');
    });
});
