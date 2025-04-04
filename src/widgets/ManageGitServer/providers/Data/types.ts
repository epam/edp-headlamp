import { UseQueryResult } from 'react-query';
import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { WidgetPermissions } from '../../types';

export interface DataContextProviderValue {
  gitServer: GitServerKubeObjectInterface | undefined;
  gitServerSecret: SecretKubeObjectInterface | undefined;
  permissions: WidgetPermissions;
  codebasesByGitServerQuery: UseQueryResult<
    KubeObjectListInterface<CodebaseKubeObjectInterface>,
    Error
  >;
  handleClosePanel: (() => void) | undefined;
}

export interface DataContextProviderProps {
  gitServer: GitServerKubeObjectInterface | undefined;
  gitServerSecret: SecretKubeObjectInterface | undefined;
  permissions: WidgetPermissions;
  handleClosePanel: (() => void) | undefined;
}
