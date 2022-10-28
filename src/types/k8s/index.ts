import { KubeMetadata } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { KubeObjectInterface } from '../../plugin.types';

export interface EDPKubeMetadata
    extends Omit<KubeMetadata, 'uid' | 'creationTimestamp' | 'resourceVersion' | 'selfLink'> {
    finalizers?: string[];
    generation?: number;
    uid?: string;
    creationTimestamp?: string;
    resourceVersion?: string;
    selfLink?: string;
}

export interface EDPKubeObjectInterface extends Omit<KubeObjectInterface, 'metadata'> {
    metadata: EDPKubeMetadata;
}
