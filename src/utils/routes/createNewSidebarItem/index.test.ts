import { createNewSidebarItem } from './index';

test('checking createNewSidebarItem', () => {
  expect(createNewSidebarItem('itemLabel', 'itemName', 'icon', 'parentName')).toEqual({
    parentName: 'parentName',
    itemLabel: 'itemLabel',
    itemName: 'edp-itemName',
    url: 'itemName',
    opts: {
      icon: 'icon',
    },
  });
});
