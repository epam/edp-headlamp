import { KubeObject } from '../../plugin.types';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface EditKubeObjectProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    kubeObject: KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    onEdit?(): void;
}
