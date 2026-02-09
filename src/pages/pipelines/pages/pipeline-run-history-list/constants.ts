import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';
import { routePipelineRunHistoryList } from './route';

export const pageDescription: PageDescription = {
  id: 'history',
  label: 'History',
  description: 'Monitor the progress of overall pipeline runs launched within the platform.',
  routePath: routePipelineRunHistoryList.path,
  docLink: EDP_USER_GUIDE.PIPELINES.url,
};
