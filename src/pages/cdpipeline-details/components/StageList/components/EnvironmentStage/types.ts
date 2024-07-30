import { CDPipelineKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CDPipeline/types';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/groups/EDP/QuickLink/types';
import { StageWithApplicationsData } from '../../../../providers/DynamicData/types';

export interface EnvironmentStageProps {
  CDPipeline: CDPipelineKubeObjectInterface;
  stageWithApplicationsData: StageWithApplicationsData;
  QuickLinksURLS: Record<string, string>;
  QuickLinks: QuickLinkKubeObjectInterface[];
}
