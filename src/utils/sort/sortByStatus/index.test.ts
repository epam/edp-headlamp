import { CUSTOM_RESOURCE_STATUSES } from '../../../constants/statuses';
import { sortByStatus } from './index';

test('checking sortByStatus', () => {
    const testArray = [
        CUSTOM_RESOURCE_STATUSES['IN_PROGRESS'],
        CUSTOM_RESOURCE_STATUSES['FAILED'],
        CUSTOM_RESOURCE_STATUSES['CREATED'],
        CUSTOM_RESOURCE_STATUSES['INITIALIZED'],
    ];
    const sortedArray = testArray.sort(sortByStatus);

    const [item1, item2, item3, item4] = sortedArray;

    expect(item1).toMatch(CUSTOM_RESOURCE_STATUSES['CREATED']);
    expect(item2).toMatch(CUSTOM_RESOURCE_STATUSES['INITIALIZED']);
    expect(item3).toMatch(CUSTOM_RESOURCE_STATUSES['IN_PROGRESS']);
    expect(item4).toMatch(CUSTOM_RESOURCE_STATUSES['FAILED']);
});
