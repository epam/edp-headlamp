import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const REGISTRY_LIST_PAGE_DESCRIPTION: PageDescription = {
  label: 'Registry',
  description: 'Establish platform integration with the Container Registry.',
  routePath: '/configuration/registry',
  docLink: EDP_USER_GUIDE.REGISTRY.url,
};
