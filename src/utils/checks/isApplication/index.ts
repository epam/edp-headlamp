import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';

export const isApplication = ({ spec: { type } }: EDPCodebaseKubeObjectInterface): boolean =>
    type === EDPCodebaseKubeObjectConfig.types.application.name.singularForm;
