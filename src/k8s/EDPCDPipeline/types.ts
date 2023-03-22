import { KubeObjectInterface } from '../../plugin.types';

export interface EDPCDPipelineSpec {
    applications: string[];
    applicationsToPromote: string[] | null;
    deploymentType: string;
    inputDockerStreams: string[];
    name: string;
}

export interface EDPCDPipelineStatus {
    action: string;
    available: boolean;
    detailed_message: string;
    last_time_updated: string;
    result: string;
    status: string;
    username: string;
    value: string;
}

export interface EDPCDPipelineKubeObjectInterface extends KubeObjectInterface {
    spec: EDPCDPipelineSpec;
    status: EDPCDPipelineStatus;
}
