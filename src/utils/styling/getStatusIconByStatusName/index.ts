import {
    STATUS_CREATED,
    STATUS_FAILED,
    STATUS_IN_PROGRESS,
    STATUS_INITIALIZED,
} from '../../../constants/statuses';
import { IconProps, StatusType } from './types';

export const getStatusIconByStatusName = (status: StatusType): IconProps => {
    switch (status) {
        case STATUS_CREATED:
            return ['bi:check-circle', '#327335'];
        case STATUS_INITIALIZED:
            return ['bi:check-circle', '#327335'];
        case STATUS_FAILED:
            return ['uiw:circle-close-o', '#ba3329'];
        case STATUS_IN_PROGRESS:
            return ['lucide:loader-2', '#009dff', true];
        default:
            return ['lucide:loader-2', '#009dff', true];
    }
};
