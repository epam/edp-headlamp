import { EDPComponentKubeObjectInterface } from '../../../../k8s/EDPComponent/types';

export interface EDPComponentListProps {
    EDPComponents: EDPComponentKubeObjectInterface[];
    error: unknown;
}
