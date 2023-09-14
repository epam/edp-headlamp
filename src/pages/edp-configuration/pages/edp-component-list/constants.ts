import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PageDescription } from '../../../../types/pages';

export const EDP_COMPONENT_LIST_PAGE_DESCRIPTION: PageDescription = {
    icon: ICONS.NEW_WINDOW,
    label: 'Links',
    description: 'Configure links for quick access to required tools.',
    docLink: EDP_USER_GUIDE.OVERVIEW.url,
    routePath: '/edp/configuration/edpcomponents',
};
