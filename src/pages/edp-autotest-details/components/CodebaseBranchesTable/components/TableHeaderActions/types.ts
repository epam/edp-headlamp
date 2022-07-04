import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

export interface TableHeaderActionsProps {
    kubeObject: KubeObject;
    codebaseName: string;
}
