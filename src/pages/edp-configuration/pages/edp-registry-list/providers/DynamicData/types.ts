import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../../../../../k8s/ServiceAccount/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  EDPConfigMap: DataProviderValue<ConfigMapKubeObjectInterface>;
  pushAccountSecret: DataProviderValue<SecretKubeObjectInterface>;
  pullAccountSecret: DataProviderValue<SecretKubeObjectInterface>;
  tektonServiceAccount: DataProviderValue<ServiceAccountKubeObjectInterface>;
}
