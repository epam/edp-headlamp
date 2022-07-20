import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';

export interface CreateKubeObjectProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    kubeObject: KubeObject;
    kubeObjectExample: DeepPartial<EDPKubeObjectInterface>;
    onCreate?(): void;
}
