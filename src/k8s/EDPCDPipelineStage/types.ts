import { EDPKubeObjectInterface } from '../../types/k8s';

interface EDPCDPipelineStageSpecQualityGatesInterface {
    autotestName: string | null;
    branchName: string | null;
    qualityGateType: string;
    stepName: string;
}

interface EDPCDPipelineStageSpecInterface {
    cdPipeline: string;
    description: string;
    jobProvisioning: string;
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
}

interface EDPCDPipelineStageStatusInterface {
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

interface EDPCDPipelineStageKubeObjectInterface extends EDPKubeObjectInterface {
    spec: EDPCDPipelineStageSpecInterface;
    status: EDPCDPipelineStageStatusInterface;
}

export {
    EDPCDPipelineStageSpecInterface,
    EDPCDPipelineStageStatusInterface,
    EDPCDPipelineStageKubeObjectInterface,
    EDPCDPipelineStageSpecQualityGatesInterface,
};
