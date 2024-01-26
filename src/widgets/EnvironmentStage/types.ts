import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { StageWithApplicationsData } from '../../pages/edp-cdpipeline-details/providers/DynamicData/types';

export interface EnvironmentStageProps {
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    stageWithApplicationsData: StageWithApplicationsData;
}
