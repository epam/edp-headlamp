import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'nexus-integration',
  label: 'Nexus',
  description: 'Store and manage your application artifacts in Nexus.',
  routePath: '/configuration/nexus-integration',
  docLink: EDP_OPERATOR_GUIDE.NEXUS.url,
};
