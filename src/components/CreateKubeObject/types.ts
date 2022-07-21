import { k8s } from '../../plugin.types';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface CreateKubeObjectProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    kubeObject: k8s.cluster.KubeObject;
    kubeObjectExample: DeepPartial<EDPKubeObjectInterface>;
    onCreate?(): void;
}
