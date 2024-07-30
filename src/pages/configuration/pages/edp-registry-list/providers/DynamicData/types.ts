import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../../../../../k8s/groups/default/ServiceAccount/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  EDPConfigMap: DataProviderValue<ConfigMapKubeObjectInterface>;
  pushAccountSecret: DataProviderValue<SecretKubeObjectInterface>;
  pullAccountSecret: DataProviderValue<SecretKubeObjectInterface>;
  tektonServiceAccount: DataProviderValue<ServiceAccountKubeObjectInterface>;
}
