import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/ConfigMap/types';

export interface DynamicDataContextProviderValue {
    EDPConfigMap: ConfigMapKubeObjectInterface;
}
