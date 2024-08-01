import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'registry-list',
  label: 'Registry',
  description: 'Establish platform integration with the Container Registry.',
  routePath: '/configuration/registry',
  docLink: EDP_USER_GUIDE.REGISTRY.url,
};
