import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';

export const isAutotest = ({ spec: { type } }: CodebaseKubeObjectInterface): boolean =>
  type === CODEBASE_TYPES['AUTOTEST'];
