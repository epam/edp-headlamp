import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';

export interface createApplicationInstanceProps {
    pipelineName: string;
    stageName: string;
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
