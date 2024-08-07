import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const pageDescription: PageDescription = {
  id: 'jira-integration',
  label: 'Jira',
  description: 'Track and deliver your projects with Jira.',
  routePath: '/configuration/jira-integration',
  docLink: EDP_OPERATOR_GUIDE.JIRA.url,
};
