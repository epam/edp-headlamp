import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../../../../../k8s/groups/EDP/GitServer/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  gitServers: DataProviderValue<GitServerKubeObjectInterface[] | null>;
  repositorySecrets: DataProviderValue<SecretKubeObjectInterface[] | null>;
  configMaps: DataProviderValue<ConfigMapKubeObjectInterface[] | null>;
  ingresses: DataProviderValue<K8s.ingress.default[] | null>;
}
