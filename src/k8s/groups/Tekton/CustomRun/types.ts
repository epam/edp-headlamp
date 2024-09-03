import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CustomRunKubeObjectInterface extends KubeObjectInterface {
  spec: {
    action: string;
    description: string;
  };
}

export interface StreamCustomRunListByPipelineNameProps {
  pipelineRunName: string;
  namespace: string;
  dataHandler: (data: CustomRunKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}
