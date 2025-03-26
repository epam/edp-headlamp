import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  codebases: {
    data: CodebaseKubeObjectInterface[] | null;
    errors: ApiError[] | null;
    isLoading: boolean;
  };
  gitServers: DataProviderValue<GitServerKubeObjectInterface[] | null>;
}
