import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';

export interface TableProps {
    data: EDPCodebaseKubeObject[];
    onEdit?(): void;
    onDelete?(): void;
}
