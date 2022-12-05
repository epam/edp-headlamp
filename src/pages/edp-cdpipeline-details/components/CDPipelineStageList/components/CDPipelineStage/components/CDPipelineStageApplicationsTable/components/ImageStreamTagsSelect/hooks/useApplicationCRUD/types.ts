import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/Application/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';

export interface createApplicationInterface {
    pipelineName: string;
    stageData: EDPCDPipelineStageKubeObjectInterface;
    appName: string;
    imageName: string;
    imageTag: string;
    namespace: string;
    versioningType: string;
}

export interface editApplicationInterface {
    versioningType: string;
    argoApplication: ApplicationKubeObjectInterface;
    deployedVersion: string;
}

export interface deleteApplicationInterface {
    argoApplication: ApplicationKubeObjectInterface;
}
