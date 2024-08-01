import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'sonar-integration',
  label: 'SonarQube',
  description: 'Enable automated code review mechanisms powered by SonarQube.',
  routePath: '/configuration/sonar-integration',
  docLink: EDP_OPERATOR_GUIDE.SONAR.url,
};
