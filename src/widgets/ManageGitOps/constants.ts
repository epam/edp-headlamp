import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';

export const GIT_OPS_CODEBASE_NAME = 'krci-gitops';

export const widgetPermissionsToCheck = {
  create: [
    {
      instance: CodebaseKubeObject as unknown as KubeObjectClass,
      config: CodebaseKubeObjectConfig,
    },
  ],
  update: [],
  delete: [],
};
