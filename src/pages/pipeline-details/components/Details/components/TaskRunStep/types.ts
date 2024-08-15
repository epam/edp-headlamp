import { TaskKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/Task/types';
import { TaskRunKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/TaskRun/types';

export interface TaskRunStepProps {
  taskRun: TaskRunKubeObjectInterface;
  task: TaskKubeObjectInterface;
  step: any;
}
