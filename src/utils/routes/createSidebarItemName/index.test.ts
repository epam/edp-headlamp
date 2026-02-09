import { createSidebarItemName } from './index';

test('checking createRouteItemName', () => {
  expect(createSidebarItemName('applications')).toMatch('edp-applications');
});
