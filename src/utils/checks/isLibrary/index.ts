import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';

export const isLibrary = ({ spec: { type } }: EDPCodebaseKubeObjectInterface): boolean =>
    type === EDPCodebaseKubeObjectConfig.types.library.name.singularForm;
