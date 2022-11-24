import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/Application/types';

export interface createApplicationInterface {
    pipelineName: string;
    stageName: string;
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
