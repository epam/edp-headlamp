import { STATUS_SORT } from '../../../configs/statusSort';

export const sortByStatus = (a: string, b: string): number => {
    if (STATUS_SORT[a] < STATUS_SORT[b]) {
        return -1;
    } else if (STATUS_SORT[a] > STATUS_SORT[b]) {
        return 1;
    }
    return 0;
};
