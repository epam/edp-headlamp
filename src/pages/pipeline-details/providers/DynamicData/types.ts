import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { TaskKubeObjectInterface } from '../../../../k8s/groups/Tekton/Task/types';
import { TaskRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/TaskRun/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DynamicDataContextProviderValue {
  pipelineRun: DataProviderValue<PipelineRunKubeObjectInterface>;
  taskRuns: DataProviderValue<TaskRunKubeObjectInterface[]>;
  pipelineRunData: DataProviderValue<{
    taskRunListByNameMap: Map<string, TaskRunKubeObjectInterface>;
    taskListByTaskRunNameMap: Map<string, TaskKubeObjectInterface[]>;
    pipelineRunFinallyTasksMap: Map<string, TaskRunKubeObjectInterface>;
    pipelineRunMainTasksMap: Map<string, TaskRunKubeObjectInterface>;
    pipelineRunTasks: {
      allTasks: TaskRunKubeObjectInterface[];
      finallyTasks: TaskRunKubeObjectInterface[];
      mainTasks: TaskRunKubeObjectInterface[];
    };
  }>;
}
