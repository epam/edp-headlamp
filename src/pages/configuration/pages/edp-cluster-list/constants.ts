import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PageDescription } from '../../../../types/pages';

export const CLUSTER_LIST_PAGE_DESCRIPTION: PageDescription = {
  id: 'cluster-list',
  label: 'Clusters',
  description: 'Scale workloads across multiple Kubernetes clusters.',
  routePath: '/configuration/clusters',
  docLink: EDP_USER_GUIDE.MANAGE_CLUSTER.url,
};
