import { EDPKubeObjectInterface } from '../../types/k8s';

interface EDPComponentSpec {
    icon: string;
    type: string;
    url: string;
    visible: boolean;
}

export interface EDPComponentKubeObjectInterface extends EDPKubeObjectInterface {
    spec: EDPComponentSpec;
    status: string;
}
