import React from 'react';
import { ApplicationKubeObjectInterface } from '../../k8s/groups/ArgoCD/Application/types';
import { EnrichedApplicationWithItsImageStreams } from '../../k8s/groups/EDP/Codebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { CodebaseImageStreamKubeObjectInterface } from '../../k8s/groups/EDP/CodebaseImageStream/types';
import { StageQualityGate } from '../../k8s/groups/EDP/Stage/schema';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';

export interface EDPStageDetailsRouteParams {
  CDPipelineName: string;
  stageName: string;
  namespace: string;
}

export type EnrichedApplicationWithArgoApplication = EnrichedApplicationWithItsImageStreams & {
  applicationVerifiedImageStream: CodebaseImageStreamKubeObjectInterface | undefined;
  argoApplication: ApplicationKubeObjectInterface | undefined;
};

export interface EnrichedQualityGateWithAutotestPipelineRun {
  qualityGate: StageQualityGate;
  autotestPipelineRun: PipelineRunKubeObjectInterface;
}

export interface CDPipelineStageProps {
  expandedPanel: string;
  handleAccordionChange(panel: string): (event: React.SyntheticEvent, isExpanded: boolean) => void;
}
