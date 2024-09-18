import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';
import { WidgetPermissions } from '../../types';

export interface DataContextProviderValue {
  gitServer: GitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
  permissions: WidgetPermissions;
}

export interface DataContextProviderProps {
  gitServer: GitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
  permissions: WidgetPermissions;
}
