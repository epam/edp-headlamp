import {
    STATUS_CREATED,
    STATUS_FAILED,
    STATUS_IN_PROGRESS,
    STATUS_INITIALIZED,
} from '../../../constants/statuses';
import { sortByStatus } from './index';

test('checking sortByStatus', () => {
    const testArray = [STATUS_IN_PROGRESS, STATUS_FAILED, STATUS_CREATED, STATUS_INITIALIZED];
    const sortedArray = testArray.sort(sortByStatus);

    const [item1, item2, item3, item4] = sortedArray;

    expect(item1).toMatch(STATUS_CREATED);
    expect(item2).toMatch(STATUS_INITIALIZED);
    expect(item3).toMatch(STATUS_IN_PROGRESS);
    expect(item4).toMatch(STATUS_FAILED);
});
