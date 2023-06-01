import React from 'react';
import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../k8s/EDPCodebaseImageStream/types';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';

export type EnrichedApplicationWithArgoApplication = EnrichedApplicationWithItsImageStreams & {
    applicationVerifiedImageStream: EDPCodebaseImageStreamKubeObjectInterface;
    argoApplication: ApplicationKubeObjectInterface;
};

export interface EnrichedQualityGateWithAutotestPipelineRun {
    qualityGate: EDPCDPipelineStageSpecQualityGatesInterface;
    autotestPipelineRun: PipelineRunKubeObjectInterface;
}

export interface CDPipelineStageProps {
    expandedPanel: string;
    handleAccordionChange(
        panel: string
    ): (event: React.SyntheticEvent, isExpanded: boolean) => void;
}
