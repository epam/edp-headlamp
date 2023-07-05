import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface EDPComponentSpec {
    icon: string;
    type: string;
    url: string;
    visible: boolean;
}

export interface EDPComponentKubeObjectInterface extends KubeObjectInterface {
    spec: EDPComponentSpec;
    status: string;
}
