import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';

export const permissionsToCheckConfig = {
  create: [{ instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig }],
  update: [],
  delete: [],
};
