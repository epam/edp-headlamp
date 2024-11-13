import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../k8s/groups/EDP/CodebaseBranch/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  component: DataProviderValue<CodebaseKubeObjectInterface>;
  pipelines: DataProviderValue<{
    review: string;
    build: string;
  }>;
  codebaseBranches: DataProviderValue<CodebaseBranchKubeObjectInterface[]>;
}
