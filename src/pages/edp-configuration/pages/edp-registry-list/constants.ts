import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PageDescription } from '../../../../types/pages';

export const REGISTRY_LIST_PAGE_DESCRIPTION: PageDescription = {
    icon: ICONS.REGISTRY,
    label: 'Registry',
    description: 'Establish platform integration with the Container Registry.',
    routePath: '/edp/configuration/registry',
    docLink: EDP_OPERATOR_GUIDE.CONTAINER_REGISTRY_HARBOR.url,
};
