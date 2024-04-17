import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const NEXUS_INTEGRATION_PAGE_DESCRIPTION: PageDescription = {
  id: 'nexus-integration',
  label: 'Nexus',
  description: 'Store and manage your application artifacts in Nexus.',
  routePath: '/configuration/nexus-integration',
  docLink: EDP_OPERATOR_GUIDE.NEXUS.url,
};
