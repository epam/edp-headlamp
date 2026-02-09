import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../../../../../k8s/groups/default/ServiceAccount/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  EDPConfigMap: DataProviderValue<ConfigMapKubeObjectInterface | undefined>;
  pushAccountSecret: DataProviderValue<SecretKubeObjectInterface | null>;
  pullAccountSecret: DataProviderValue<SecretKubeObjectInterface | null>;
  tektonServiceAccount: DataProviderValue<ServiceAccountKubeObjectInterface | null>;
}
