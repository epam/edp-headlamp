import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface ApprovalTaskKubeObjectInterface extends KubeObjectInterface {
  spec: {
    action: string;
    description: string;
  };
}

export interface StreamApprovalTaskListByPipelineNameProps {
  pipelineRunName: string;
  namespace: string;
  dataHandler: (data: ApprovalTaskKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}
