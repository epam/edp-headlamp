import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { EnrichedApplicationWithArgoApplication } from '../../types';

export interface CustomGatesProps {
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
  argoApplications: ApplicationKubeObjectInterface[];
  latestTenDeployPipelineRuns: PipelineRunKubeObjectInterface[];
  everyArgoAppIsHealthyAndInSync: boolean;
}
