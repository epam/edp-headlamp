import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';

export interface ApplicationListProps {
    applications: EDPCodebaseKubeObjectInterface[];
    onEdit?(): void;
    onDelete?(): void;
}
