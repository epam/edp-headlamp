import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

export interface createApplicationInstanceProps {
    pipelineName: string;
    stageData: EDPCDPipelineStageKubeObjectInterface;
    appName: string;
    imageName: string;
    imageTag: string;
    port: number;
    namespace: string;
    versioningType: string;
}

export interface editApplicationInstanceProps {
    versioningType: string;
    argoApplication: ApplicationKubeObjectInterface;
    deployedVersion: string;
}
