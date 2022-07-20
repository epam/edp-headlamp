import {
    ICON_CHECK_CIRCLE,
    ICON_CROSS_CIRCLE,
    ICON_EMPTY_CIRCLE,
    ICON_LOADER_CIRCLE,
} from '../../../constants/icons';
import {
    STATUS_CREATED,
    STATUS_FAILED,
    STATUS_IN_PROGRESS,
    STATUS_INITIALIZED,
    STATUS_UNKNOWN,
} from '../../../constants/statuses';
import { IconProps, StatusType } from './types';

export const getStatusIconByStatusName = (status: StatusType): IconProps => {
    switch (status) {
        case STATUS_CREATED:
            return [ICON_CHECK_CIRCLE, '#327335'];
        case STATUS_INITIALIZED:
            return [ICON_CHECK_CIRCLE, '#327335'];
        case STATUS_FAILED:
            return [ICON_CROSS_CIRCLE, '#ba3329'];
        case STATUS_IN_PROGRESS:
            return [ICON_LOADER_CIRCLE, '#009dff', true];
        case STATUS_UNKNOWN:
            return [ICON_EMPTY_CIRCLE, 'grey'];
        default:
            return [ICON_LOADER_CIRCLE, '#009dff', true];
    }
};
