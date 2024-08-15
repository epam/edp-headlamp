import { TaskKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/Task/types';
import { TaskRunKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/TaskRun/types';

export interface TaskRunProps {
  taskRun: TaskRunKubeObjectInterface;
  task: TaskKubeObjectInterface;
  taskRunName: string;
}
