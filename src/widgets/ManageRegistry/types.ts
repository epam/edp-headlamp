import { ConfigMapKubeObjectInterface } from '../../k8s/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../k8s/ServiceAccount/types';
import { REGISTRY_NAMES } from './names';

export interface ManageRegistryDataContext {
    EDPConfigMap: ConfigMapKubeObjectInterface;
    pushAccountSecret: SecretKubeObjectInterface;
    pullAccountSecret: SecretKubeObjectInterface;
    tektonServiceAccount: ServiceAccountKubeObjectInterface;
    handleClosePanel: () => void;
}

export interface ManageRegistryProps {
    formData: {
        EDPConfigMap: ConfigMapKubeObjectInterface;
        pushAccountSecret: SecretKubeObjectInterface;
        pullAccountSecret: SecretKubeObjectInterface;
        tektonServiceAccount: ServiceAccountKubeObjectInterface;
    };
}

type ManageRegistryNames = typeof REGISTRY_NAMES[keyof typeof REGISTRY_NAMES];

export type ManageRegistryValues = {
    [key in ManageRegistryNames]: any;
};
