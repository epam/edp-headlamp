import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const REGISTRY_LIST_PAGE_DESCRIPTION: PageDescription = {
  label: 'Registry',
  description: 'Establish platform integration with the Container Registry.',
  routePath: '/edp/configuration/registry',
  docLink: EDP_OPERATOR_GUIDE.REGISTRY.url,
};
