import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { ApprovalTaskKubeObjectInterface } from '../../EDP/ApprovalTask/types';
import { TaskKubeObjectInterface } from '../Task/types';
import { TaskRunKubeObjectInterface } from '../TaskRun/types';

export interface PipelineRunKubeObjectInterface extends KubeObjectInterface {}

export interface PipelineRunTask {
  name: string;
  params: {
    name: string;
    value: string;
  }[];
  taskRef: {
    kind: string;
    name: string;
  };
  runAfter?: string[];
}

export interface StreamItemProps {
  namespace: string;
  name: string;
  dataHandler: (data: PipelineRunKubeObjectInterface) => void;
  errorHandler: (err: Error) => void;
}

export interface PipelineRunTaskData {
  pipelineRunTask: PipelineRunTask;
  task: TaskKubeObjectInterface;
  taskRun: TaskRunKubeObjectInterface;
  approvalTask: ApprovalTaskKubeObjectInterface;
}

export interface PipelineRunData {
  pipelineRunTasks: {
    allTasks: PipelineRunTask[];
    mainTasks: PipelineRunTask[];
    finallyTasks: PipelineRunTask[];
  };
  pipelineRunTasksByNameMap: Map<string, PipelineRunTaskData>;
}
