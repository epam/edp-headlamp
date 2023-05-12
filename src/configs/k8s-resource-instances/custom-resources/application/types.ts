import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithImageStreams } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../k8s/EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';

export interface createApplicationInstanceProps {
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    enrichedApplication: EnrichedApplicationWithImageStreams;
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    imageTag: string;
    gitServer: EDPGitServerKubeObjectInterface;
}

export interface editApplicationInstanceProps {
    enrichedApplication: EnrichedApplicationWithImageStreams;
    argoApplication: ApplicationKubeObjectInterface;
    imageTag: string;
}
