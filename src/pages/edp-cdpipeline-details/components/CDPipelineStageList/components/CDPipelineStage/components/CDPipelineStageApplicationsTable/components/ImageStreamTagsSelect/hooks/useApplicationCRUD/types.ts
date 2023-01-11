import { EnrichedApplication } from '../../../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/Application/types';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPGitServer/types';

export interface createApplicationInterface {
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    enrichedApplication: EnrichedApplication;
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    imageTag: string;
    gitServer: EDPGitServerKubeObjectInterface;
}

export interface editApplicationInterface {
    enrichedApplication: EnrichedApplication;
    argoApplication: ApplicationKubeObjectInterface;
    imageTag: string;
}

export interface deleteApplicationInterface {
    argoApplication: ApplicationKubeObjectInterface;
}
