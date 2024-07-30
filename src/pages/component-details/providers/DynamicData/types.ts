import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  component: DataProviderValue<CodebaseKubeObjectInterface>;
}
