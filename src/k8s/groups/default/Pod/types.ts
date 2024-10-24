import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface PodKubeObjectInterface extends KubeObjectInterface {}

export interface StreamListProps {
  namespace: string;
  dataHandler: (data: PodKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}
