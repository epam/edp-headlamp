import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface ClusterListProps {
    clusterSecrets: KubeObjectInterface[];
    error: unknown;
}
