import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface ComponentListProps {
    components: EDPCodebaseKubeObjectInterface[];
    type: CODEBASE_TYPES;
}
