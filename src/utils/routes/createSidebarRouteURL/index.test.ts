import {
    createSidebarRouteURLBasedOnName,
    createSidebarRouteURLBasedOnNameAndNamespace,
} from './index';

describe('testing expected input', () => {
    test('checking createSidebarRouteURLBasedOnName', () => {
        expect(createSidebarRouteURLBasedOnName('applications')).toMatch('/edp/applications');
    });
    test('checking createSidebarRouteURLBasedOnName', () => {
        expect(createSidebarRouteURLBasedOnNameAndNamespace('applications')).toMatch(
            '/edp/applications/:namespace/:name'
        );
    });
});
