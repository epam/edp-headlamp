import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface ConfigMapKubeObjectInterface extends KubeObjectInterface {}

export interface StreamListProps {
    namespace: string;
    dataHandler: (data: ConfigMapKubeObjectInterface) => void;
    errorHandler: (err: Error) => void;
}
