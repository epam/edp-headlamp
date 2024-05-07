import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { TaskRunKubeObjectInterface } from '../../../../k8s/TaskRun/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  pipelineRun: DataProviderValue<PipelineRunKubeObjectInterface>;
  taskRuns: DataProviderValue<TaskRunKubeObjectInterface[]>;
  pipelineRunData: DataProviderValue<{
    taskRunListByNameMap: Map<string, TaskRunKubeObjectInterface>;
    pipelineRunFinallyTasksMap: Map<string, TaskRunKubeObjectInterface>;
    pipelineRunMainTasksMap: Map<string, TaskRunKubeObjectInterface>;
    pipelineRunTasks: {
      allTasks: TaskRunKubeObjectInterface[];
      finallyTasks: TaskRunKubeObjectInterface[];
      mainTasks: TaskRunKubeObjectInterface[];
    };
  }>;
}
