import { ConfigMapKubeObjectInterface } from '../../../../k8s/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../../../k8s/ServiceAccount/types';

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
