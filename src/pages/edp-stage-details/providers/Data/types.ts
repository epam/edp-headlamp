import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/QuickLink/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DataContextProviderValue {
  CDPipeline: DataProviderValue<EDPCDPipelineKubeObjectInterface>;
  stages: DataProviderValue<EDPCDPipelineStageKubeObjectInterface[]>;
  enrichedApplications: DataProviderValue<EnrichedApplicationWithItsImageStreams[]>;
  gitOpsCodebase: DataProviderValue<EDPCodebaseKubeObjectInterface>;
  QuickLinks: DataProviderValue<QuickLinkKubeObjectInterface[]>;
  QuickLinksURLs: DataProviderValue<Record<string, string>>;
}
