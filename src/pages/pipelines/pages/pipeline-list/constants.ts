import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { PipelineKubeObjectConfig } from '../../../../k8s/groups/Tekton/Pipeline/config';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../../../k8s/groups/Tekton/PipelineRun/config';
import { PageDescription } from '../../../../types/pages';
import { routePipelineList } from './route';

export const pageDescription: PageDescription = {
  id: 'pipelines',
  label: 'Pipelines',
  description: 'Manage CI/CD pipelines.',
  routePath: routePipelineList.path,
  docLink: EDP_USER_GUIDE.PIPELINES.url,
};

export const permissionsToCheckConfig = {
  create: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
  update: [
    {
      instance: PipelineKubeObject as unknown as KubeObjectClass,
      config: PipelineKubeObjectConfig,
    },
  ],
  delete: [],
};
