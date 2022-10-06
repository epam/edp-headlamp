import { ICONS } from '../../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../../constants/statuses';
import { IconProps, StatusType } from './types';

export const getStatusIconByStatusName = (status: StatusType): IconProps => {
    switch (status) {
        case CUSTOM_RESOURCE_STATUSES['CREATED']:
            return [ICONS['CHECK_CIRCLE'], '#327335'];

        case CUSTOM_RESOURCE_STATUSES['FAILED']:
            return [ICONS['CROSS_CIRCLE'], '#ba3329'];

        case CUSTOM_RESOURCE_STATUSES['INITIALIZED']:
            return [ICONS['LOADER_CIRCLE'], '#009dff', true];

        case CUSTOM_RESOURCE_STATUSES['IN_PROGRESS']:
            return [ICONS['LOADER_CIRCLE'], '#009dff', true];

        case CUSTOM_RESOURCE_STATUSES['UNKNOWN']:
            return [ICONS['EMPTY_CIRCLE'], 'grey'];

        default:
            return [ICONS['LOADER_CIRCLE'], '#009dff', true];
    }
};
