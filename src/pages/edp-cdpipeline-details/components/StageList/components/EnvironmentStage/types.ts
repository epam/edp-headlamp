import { EDPCDPipelineKubeObjectInterface } from '../../../../../../k8s/EDPCDPipeline/types';
import { StageWithApplicationsData } from '../../../../providers/DynamicData/types';

export interface EnvironmentStageProps {
  CDPipeline: EDPCDPipelineKubeObjectInterface;
  stageWithApplicationsData: StageWithApplicationsData;
}
