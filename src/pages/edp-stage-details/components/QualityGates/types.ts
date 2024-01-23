import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { EnrichedQualityGateWithAutotestPipelineRun } from '../../types';

export interface QualityGatesProps {
  enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[];
  argoApplications: ApplicationKubeObjectInterface[];
  latestAutotestRunnerPipelineRuns: PipelineRunKubeObjectInterface[];
  latestTenAutotestPipelineRuns: PipelineRunKubeObjectInterface[];
  everyArgoAppIsHealthyAndInSync: boolean;
}
