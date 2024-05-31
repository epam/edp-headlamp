import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  component: DataProviderValue<EDPCodebaseKubeObjectInterface>;
}
