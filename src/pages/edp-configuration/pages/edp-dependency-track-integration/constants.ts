import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION: PageDescription = {
  id: 'dependency-track-integration',
  label: 'DependencyTrack',
  description: 'Monitor and manage vulnerabilities within third-party components.',
  routePath: '/configuration/dependency-track-integration',
  docLink: EDP_OPERATOR_GUIDE.DEPENDENCY_TRACK.url
};
