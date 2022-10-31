import { CUSTOM_RESOURCE_ACTIVE_STATUSES } from '../../../constants/statuses';
import { sortByActiveStatus } from './index';

test('checking sortByStatus', () => {
    const testArray = [
        CUSTOM_RESOURCE_ACTIVE_STATUSES['ACTIVE'],
        CUSTOM_RESOURCE_ACTIVE_STATUSES['INACTIVE'],
    ];
    const sortedArray = testArray.sort(sortByActiveStatus);

    const [item1, item2] = sortedArray;

    expect(item1).toMatch(CUSTOM_RESOURCE_ACTIVE_STATUSES['ACTIVE']);
    expect(item2).toMatch(CUSTOM_RESOURCE_ACTIVE_STATUSES['INACTIVE']);
});
