import { getCustomResourceStatusIconByStatusName } from './index';

describe('checking expected input', () => {
    test('checking getIconByStatus', () => {
        expect(getCustomResourceStatusIconByStatusName('in-progress')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
        expect(getCustomResourceStatusIconByStatusName('initialized')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
        expect(getCustomResourceStatusIconByStatusName('created')).toEqual([
            'bi:check-circle',
            '#327335',
        ]);
        expect(getCustomResourceStatusIconByStatusName('failed')).toEqual([
            'uiw:circle-close-o',
            '#ba3329',
        ]);
        expect(getCustomResourceStatusIconByStatusName('unknown')).toEqual([
            'akar-icons:circle',
            'grey',
        ]);
    });
});

describe('checking unexpected input', () => {
    test('checking getIconByStatus', () => {
        expect(getCustomResourceStatusIconByStatusName('test status name')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
    });
});
