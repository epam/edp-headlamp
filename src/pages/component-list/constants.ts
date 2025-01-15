import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { CodebaseKubeObject } from '../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../k8s/groups/EDP/Codebase/config';
import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { MatchFunctions } from './types';

export const codebaseListFilterControlNames = {
  CODEBASE_TYPE: 'codebaseType',
} as const;

export const matchFunctions: MatchFunctions = {
  [codebaseListFilterControlNames.CODEBASE_TYPE]: (
    item: CodebaseKubeObjectInterface,
    value: string
  ) => {
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
