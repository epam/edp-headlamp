import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface TaskKubeObjectInterface extends KubeObjectInterface {}

export interface StreamListProps {
  namespace: string;
  dataHandler: (data: TaskKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}
