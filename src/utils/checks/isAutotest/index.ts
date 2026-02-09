import { CODEBASE_TYPE } from '../../../constants/codebaseTypes';
import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';

export const isAutotest = ({ spec: { type } }: CodebaseKubeObjectInterface): boolean =>
  type === CODEBASE_TYPE.AUTOTEST;
