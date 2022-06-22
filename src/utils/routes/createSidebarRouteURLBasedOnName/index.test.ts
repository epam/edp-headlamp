import { createSidebarRouteURLBasedOnName } from './index';

test('checking createSidebarRouteURLBasedOnName', () => {
    expect(createSidebarRouteURLBasedOnName('applications')).toMatch('/edp/applications');
});
