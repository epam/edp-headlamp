import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface ComponentListProps {
    items: EDPCodebaseKubeObjectInterface[];
    error: unknown;
    noGitServers: boolean;
    filterFunction: (item: EDPCodebaseKubeObjectInterface) => boolean;
}
