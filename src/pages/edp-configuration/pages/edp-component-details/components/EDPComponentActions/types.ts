import { EDPComponentKubeObjectInterface } from '../../../../../../k8s/EDPComponent/types';

export interface EDPComponentActionsProps {
    EDPComponent: EDPComponentKubeObjectInterface;
    backRoute?: string;
}
