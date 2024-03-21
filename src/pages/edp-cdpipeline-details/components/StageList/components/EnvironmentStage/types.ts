import { EDPCDPipelineKubeObjectInterface } from '../../../../../../k8s/EDPCDPipeline/types';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/QuickLink/types';
import { StageWithApplicationsData } from '../../../../providers/DynamicData/types';

export interface EnvironmentStageProps {
  CDPipeline: EDPCDPipelineKubeObjectInterface;
  stageWithApplicationsData: StageWithApplicationsData;
  QuickLinksURLS: Record<string, string>;
  QuickLinks: QuickLinkKubeObjectInterface[];
}
