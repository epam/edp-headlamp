import {
    STATUS_CREATED,
    STATUS_FAILED,
    STATUS_IN_PROGRESS,
    STATUS_INITIALIZED,
} from '../constants/statuses';

interface StatusType {
    [key: string]: number;
}
export const STATUS_SORT: StatusType = {
    [STATUS_CREATED]: 0,
    [STATUS_INITIALIZED]: 0,
    [STATUS_IN_PROGRESS]: 1,
    [STATUS_FAILED]: 2,
};
