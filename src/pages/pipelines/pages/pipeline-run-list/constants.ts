import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../../../k8s/groups/Tekton/PipelineRun/config';
import { PageDescription } from '../../../../types/pages';
import { routePipelineRunList } from './route';

export const pageDescription: PageDescription = {
  id: 'pipelineRuns',
  label: 'PipelineRuns',
  description: 'Monitor the progress of overall pipeline runs launched within the platform.',
  routePath: routePipelineRunList.path,
  docLink: EDP_USER_GUIDE.CONFIGURATION.url,
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
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
};
