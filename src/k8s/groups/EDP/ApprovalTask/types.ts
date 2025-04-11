import { ApprovalTask } from './schema';

export type ApprovalTaskKubeObjectInterface = ApprovalTask;

export interface StreamApprovalTaskListByPipelineNameProps {
  pipelineRunName: string;
  namespace: string;
  dataHandler: (data: ApprovalTaskKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}
