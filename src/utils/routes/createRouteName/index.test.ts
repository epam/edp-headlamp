import { createRouteName, createRouteNameBasedOnNameAndNamespace } from './index';

describe('testing expected input', () => {
    test('checking createSidebarRouteURLBasedOnName', () => {
        expect(createRouteName('applications')).toMatch('/edp/applications');
    });
    test('checking createSidebarRouteURLBasedOnName', () => {
        expect(createRouteNameBasedOnNameAndNamespace('applications')).toMatch(
            '/edp/applications/:namespace/:name'
        );
    });
});
