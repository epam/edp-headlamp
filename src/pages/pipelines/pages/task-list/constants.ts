import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { TaskKubeObjectConfig } from '../../../../k8s/groups/Tekton/Task/config';
import { PageDescription } from '../../../../types/pages';
import { routeTaskList } from './route';

export const pageDescription: PageDescription = {
  id: 'tasks',
  label: 'Tasks',
  description: 'Manage CI/CD tasks.',
  routePath: routeTaskList.path,
  docLink: EDP_USER_GUIDE.PIPELINES.url,
};

export const permissionsToCheckConfig = {
  create: [],
  update: [
    {
      instance: TaskKubeObject as unknown as KubeObjectClass,
      config: TaskKubeObjectConfig,
    },
  ],
  delete: [],
};
