import { CODEBASE_TYPES } from '../../../constants/codebaseTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';

export const isAutotest = ({ spec: { type } }: EDPCodebaseKubeObjectInterface): boolean =>
    type === CODEBASE_TYPES['AUTOTEST'];
