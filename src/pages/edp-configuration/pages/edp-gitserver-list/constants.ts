import { URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PageDescription } from '../../../../types/pages';

export const GIT_SERVER_LIST_PAGE_DESCRIPTION: PageDescription = {
    icon: ICONS.REPOSITORY,
    label: 'Git Servers',
    description: 'Integrate platform with Version Control Systems.',
    docLink: URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD,
    routePath: '/edp/configuration/gitservers',
};
