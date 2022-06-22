import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

interface EDPComponentSpec {
    icon: string;
    type: string;
    url: string;
    visible: boolean;
}

export interface EDPComponentKubeObjectInterface extends KubeObjectInterface {
    spec: EDPComponentSpec;
    status: string;
}
