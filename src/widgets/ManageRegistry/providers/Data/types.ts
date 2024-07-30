import { ConfigMapKubeObjectInterface } from '../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../../../k8s/groups/default/ServiceAccount/types';

export interface DataContextProviderValue {
  EDPConfigMap: ConfigMapKubeObjectInterface;
  pushAccountSecret: SecretKubeObjectInterface;
  pullAccountSecret: SecretKubeObjectInterface;
  tektonServiceAccount: ServiceAccountKubeObjectInterface;
}

export interface DataContextProviderProps {
  EDPConfigMap: ConfigMapKubeObjectInterface;
  pushAccountSecret: SecretKubeObjectInterface;
  pullAccountSecret: SecretKubeObjectInterface;
  tektonServiceAccount: ServiceAccountKubeObjectInterface;
}
