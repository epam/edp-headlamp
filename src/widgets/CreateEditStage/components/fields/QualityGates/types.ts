import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../k8s/EDPCDPipelineStage/types';

export interface AutotestWithBranchesOption {
    name: string;
    branches: string[];
    disabled?: boolean;
}

export interface QualityGate extends EDPCDPipelineStageSpecQualityGatesInterface {
    id: number;
}
