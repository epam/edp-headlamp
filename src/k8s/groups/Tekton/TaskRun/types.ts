import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { ValueOf } from '../../../../types/global';
import { TASK_RUN_STEP_REASON } from './constants';

export interface TaskRunKubeObjectInterface extends KubeObjectInterface {}

export interface StreamTaskRunListByPipelineNameAndPipelineTypeProps {
  namespace: string;
  CDPipelineName: string;
  pipelineType: string;
  parentPipelineRunName: string;
  dataHandler: (data: TaskRunKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}

export interface TaskRunStep {
  // @ts-ignore
  name: string;
  [key: string]: {
    reason?: ValueOf<typeof TASK_RUN_STEP_REASON>;
  };
}
