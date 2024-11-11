import { PipelineRunTaskData } from '../../../../../../k8s/groups/Tekton/PipelineRun/types';

export interface TaskRunStepProps {
  pipelineRunTaskData: PipelineRunTaskData;
  stepName: string;
}
