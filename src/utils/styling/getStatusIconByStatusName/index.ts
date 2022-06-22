import { IconProps, StatusType } from './types';

export const getStatusIconByStatusName = (status: StatusType): IconProps => {
    switch (status) {
        case 'created':
            return ['bi:check-circle', '#327335'];
        case 'initialized':
            return ['bi:check-circle', '#327335'];
        case 'failed':
            return ['uiw:circle-close-o', '#ba3329'];
        case 'in-progress':
            return ['lucide:loader-2', '#009dff', true];
        default:
            return ['lucide:loader-2', '#009dff', true];
    }
};
