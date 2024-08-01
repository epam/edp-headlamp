import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../../../../../k8s/groups/EDP/GitServer/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  gitServers: DataProviderValue<GitServerKubeObjectInterface[]>;
  repositorySecrets: DataProviderValue<SecretKubeObjectInterface[]>;
  configMaps: DataProviderValue<ConfigMapKubeObjectInterface[]>;
  ingresses: DataProviderValue<any[]>;
}
