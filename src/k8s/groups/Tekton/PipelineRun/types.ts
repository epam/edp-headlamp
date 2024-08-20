import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface PipelineRunKubeObjectInterface extends KubeObjectInterface {}

export interface StreamItemProps {
  namespace: string;
  name: string;
  dataHandler: (data: PipelineRunKubeObjectInterface) => void;
  errorHandler: (err: Error) => void;
}
