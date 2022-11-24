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
        expect(getCustomResourceStatusIconByStatusName('active')).toEqual([
            'bi:check-circle',
            '#327335',
        ]);
        expect(getCustomResourceStatusIconByStatusName('failed')).toEqual([
            'uiw:circle-close-o',
            '#ba3329',
        ]);
        expect(getCustomResourceStatusIconByStatusName('inactive')).toEqual([
            'uiw:circle-close-o',
            '#ba3329',
        ]);
        expect(getCustomResourceStatusIconByStatusName('unknown')).toEqual([
            'pajamas:severity-unknown',
            'grey',
        ]);
        expect(getCustomResourceStatusIconByStatusName('succeeded')).toEqual([
            'bi:check-circle',
            '#327335',
        ]);
        expect(getCustomResourceStatusIconByStatusName('running')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
        expect(getCustomResourceStatusIconByStatusName('healthy')).toEqual([
            'ph:heart-bold',
            '#327335',
        ]);
        expect(getCustomResourceStatusIconByStatusName('progressing')).toEqual([
            'lucide:loader-2',
            '#009dff',
            true,
        ]);
        expect(getCustomResourceStatusIconByStatusName('degraded')).toEqual([
            'ph:heart-break-bold',
            '#ba3329',
        ]);
        expect(getCustomResourceStatusIconByStatusName('suspended')).toEqual([
            'ic:sharp-pause-circle-filled',
            '#766f94',
        ]);
        expect(getCustomResourceStatusIconByStatusName('missing')).toEqual(['ph:ghost', '#f4c030']);
        expect(getCustomResourceStatusIconByStatusName('synced')).toEqual([
            'material-symbols:check-circle-outline-rounded',
            '#327335',
        ]);
        expect(getCustomResourceStatusIconByStatusName('outofsync')).toEqual([
            'material-symbols:arrow-circle-up-outline-rounded',
            '#f4c030',
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
