import { SecretKubeObjectInterface } from '../../k8s/Secret/types';

export interface ContainerRegistryItem {
    name: string;
    secret: SecretKubeObjectInterface;
    registryEndpoint: string;
    secretName: string;
}
