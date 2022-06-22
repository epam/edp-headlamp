import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface CreateKubeObjectProps {
    editorOpen: boolean;
    setEditorOpen(boolean): void;
    kubeObject: KubeObject;
    kubeObjectExample: any;
}
