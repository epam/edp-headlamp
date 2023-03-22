import { KubeObjectInterface } from '../../plugin.types';

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
