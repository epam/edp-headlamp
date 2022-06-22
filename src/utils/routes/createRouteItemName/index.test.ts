import { createRouteItemName } from './index';

test('checking createRouteItemName', () => {
    expect(createRouteItemName('applications')).toMatch('edp-applications');
});
