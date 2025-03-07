import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { CODEBASE_TYPE } from '../../constants/codebaseTypes';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';
import { MatchFunctions } from './types';

export const codebaseListFilterControlNames = {
  CODEBASE_TYPE: 'codebaseType',
} as const;

export const matchFunctions: MatchFunctions = {
  [codebaseListFilterControlNames.CODEBASE_TYPE]: (item, value) => {
    if (value === CODEBASE_TYPE.ALL) {
      return true;
    }

    if (Array.isArray(value)) {
      return value.includes(item.spec.type);
    }
    return item.spec.type === value;
  },
};

export const permissionsToCheckConfig = {
  create: [
    {
      instance: CodebaseKubeObject as unknown as KubeObjectClass,
      config: CodebaseKubeObjectConfig,
    },
  ],
  update: [
    {
      instance: CodebaseKubeObject as unknown as KubeObjectClass,
      config: CodebaseKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: CodebaseKubeObject as unknown as KubeObjectClass,
      config: CodebaseKubeObjectConfig,
    },
  ],
};
