import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../k8s/groups/EDP/Codebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';
import { DataProviderValue } from '../../../../types/pages';

export interface DataContextProviderValue {
  CDPipeline: DataProviderValue<CDPipelineKubeObjectInterface | null | undefined>;
  stages: DataProviderValue<StageKubeObjectInterface[] | undefined>;
  enrichedApplications: DataProviderValue<EnrichedApplicationWithItsImageStreams[] | undefined>;
  gitOpsCodebase: DataProviderValue<CodebaseKubeObjectInterface | undefined>;
  QuickLinks: DataProviderValue<QuickLinkKubeObjectInterface[] | undefined>;
  QuickLinksURLs: DataProviderValue<Record<string, string> | undefined>;
}
