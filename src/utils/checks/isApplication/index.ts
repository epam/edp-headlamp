import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';

export const isApplication = ({ spec: { type } }: CodebaseKubeObjectInterface): boolean =>
  type === CODEBASE_TYPES['APPLICATION'];
