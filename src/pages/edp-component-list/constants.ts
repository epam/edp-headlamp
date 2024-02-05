import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { MatchFunctions } from './types';

export const FILTER_CONTROLS = {
  CODEBASE_TYPE: 'codebaseType',
};

export const matchFunctions: MatchFunctions = {
  [FILTER_CONTROLS.CODEBASE_TYPE]: (item: EDPCodebaseKubeObjectInterface, value: string) => {
    if (value === CODEBASE_TYPES.ALL) {
      return true;
    }

    return item.spec.type === value;
  },
};
