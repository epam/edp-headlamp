import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface EDPCDPipelineStageSpecQualityGatesInterface {
    autotestName: string | null;
    branchName: string | null;
    qualityGateType: string;
    stepName: string;
}

export interface EDPCDPipelineStageSpecInterface {
    cdPipeline: string;
    description: string;
    name: string;
    order: number;
    qualityGates: EDPCDPipelineStageSpecQualityGatesInterface[];
    source: {
        library: {
            branch: string;
            name: string;
        } | null;
        type: string;
    };
    triggerType: string;
    namespace: string;
    clusterName: string;
}

export interface EDPCDPipelineStageStatusInterface {
    action: string;
    available: boolean;
    detailed_message: string;
    last_time_updated: string;
    result: string;
    shouldBeHandled: boolean;
    status: string;
    username: string;
    value: string;
}

export interface EDPCDPipelineStageKubeObjectInterface extends KubeObjectInterface {
    spec: EDPCDPipelineStageSpecInterface;
    status: EDPCDPipelineStageStatusInterface;
}

export interface StreamCDPipelineStagesByCDPipelineNameProps {
    namespace: string;
    CDPipelineMetadataName: string;
    dataHandler: (data: EDPCDPipelineStageKubeObjectInterface[]) => void;
    errorHandler: (err: Error) => void;
}

export interface StreamCDPipelineStageProps {
    namespace: string;
    dataHandler: (data: EDPCDPipelineStageKubeObjectInterface) => void;
    errorHandler: (err: Error) => void;
    stageMetadataName: string;
}
