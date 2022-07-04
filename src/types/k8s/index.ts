import { KubeMetadata, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface EDPKubeMetadata extends KubeMetadata {
    finalizers: string[];
    generation: string;
}

export interface EDPKubeObjectInterface extends KubeObjectInterface {
    metadata: EDPKubeMetadata;
}
