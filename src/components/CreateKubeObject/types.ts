import { KubeObject, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { DeepPartial } from '../../types/global';

export interface CreateKubeObjectProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    kubeObject: KubeObject;
    kubeObjectExample: DeepPartial<KubeObjectInterface>;
}
