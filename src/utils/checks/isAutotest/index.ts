import { EDPCodebaseKubeObjectConfig } from '../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';

export const isAutotest = ({ spec: { type } }: EDPCodebaseKubeObjectInterface): boolean =>
    type === EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm;
