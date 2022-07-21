import { k8s } from '../../plugin.types';

export interface EDPKubeMetadata extends k8s.cluster.KubeMetadata {
    finalizers: string[];
    generation: string;
}

export interface EDPKubeObjectInterface extends k8s.cluster.KubeObjectInterface {
    metadata: EDPKubeMetadata;
}
