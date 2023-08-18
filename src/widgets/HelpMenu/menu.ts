import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';

export const HELP_MENU_LIST = [
    {
        id: 0,
        label: 'Documentation',
        icon: ICONS.DOC,
        url: EDP_USER_GUIDE.OVERVIEW.url,
    },
    {
        id: 1,
        label: 'Join Discussions',
        icon: ICONS.CHAT,
        url: 'https://github.com/epam/edp-install/discussions',
    },
    {
        id: 2,
        label: 'Open an issue/request',
        icon: ICONS.NEW_ISSUE,
        url: 'https://github.com/epam/edp-install/issues/new/choose',
    },
];
