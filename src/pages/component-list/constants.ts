import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';
import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { MatchFunctions } from './types';

export const FILTER_CONTROLS = {
  CODEBASE_TYPE: 'codebaseType',
};

export const matchFunctions: MatchFunctions = {
  [FILTER_CONTROLS.CODEBASE_TYPE]: (item: CodebaseKubeObjectInterface, value: string) => {
    if (value === CODEBASE_TYPES.ALL) {
      return true;
    }

    return item.spec.type === value;
  },
};

export const permissionsToCheckConfig = {
  create: [{ instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig }],
  update: [{ instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig }],
  delete: [{ instance: CodebaseKubeObject, config: CodebaseKubeObjectConfig }],
};
