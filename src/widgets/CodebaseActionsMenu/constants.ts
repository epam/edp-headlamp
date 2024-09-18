import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [{ instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig }],
  delete: [{ instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig }],
};
