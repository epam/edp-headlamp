import { CUSTOM_RESOURCE_ACTIVE_STATUS } from '../../../constants/statuses';
import { sortByActiveStatus } from './index';

test('checking sortByStatus', () => {
  const testArray = [
    CUSTOM_RESOURCE_ACTIVE_STATUS['ACTIVE'],
    CUSTOM_RESOURCE_ACTIVE_STATUS['INACTIVE'],
  ];
  const sortedArray = testArray.sort(sortByActiveStatus);

  const [item1, item2] = sortedArray;

  expect(item1).toMatch(CUSTOM_RESOURCE_ACTIVE_STATUS['ACTIVE']);
  expect(item2).toMatch(CUSTOM_RESOURCE_ACTIVE_STATUS['INACTIVE']);
});
