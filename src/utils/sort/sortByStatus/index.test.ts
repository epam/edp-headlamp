import { CUSTOM_RESOURCE_STATUS } from '../../../constants/statuses';
import { sortByStatus } from './index';

test('checking sortByStatus', () => {
  const testArray = [
    CUSTOM_RESOURCE_STATUS.IN_PROGRESS,
    CUSTOM_RESOURCE_STATUS.FAILED,
    CUSTOM_RESOURCE_STATUS.CREATED,
    CUSTOM_RESOURCE_STATUS.INITIALIZED,
  ];
  const sortedArray = testArray.sort(sortByStatus);

  const [item1, item2, item3, item4] = sortedArray;

  expect(item1).toMatch(CUSTOM_RESOURCE_STATUS.CREATED);
  expect(item2).toMatch(CUSTOM_RESOURCE_STATUS.INITIALIZED);
  expect(item3).toMatch(CUSTOM_RESOURCE_STATUS.IN_PROGRESS);
  expect(item4).toMatch(CUSTOM_RESOURCE_STATUS.FAILED);
});
