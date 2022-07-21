import { k8s } from '../../plugin.types';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface EditKubeObjectProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectData: EDPKubeObjectInterface;
    onEdit?(): void;
}
