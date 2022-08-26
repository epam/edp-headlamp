import { getStatusIconByStatusName } from './index';

describe('checking expected input', () => {
    test('checking getIconByStatus', () => {
        expect(getStatusIconByStatusName('in-progress')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
        expect(getStatusIconByStatusName('initialized')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
        expect(getStatusIconByStatusName('created')).toEqual(['bi:check-circle', '#327335']);
        expect(getStatusIconByStatusName('failed')).toEqual(['uiw:circle-close-o', '#ba3329']);
        expect(getStatusIconByStatusName('unknown')).toEqual(['akar-icons:circle', 'grey']);
    });
});

describe('checking unexpected input', () => {
    test('checking getIconByStatus', () => {
        expect(getStatusIconByStatusName('test status name')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
    });
});
