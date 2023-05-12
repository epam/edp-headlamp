import { CreationFormFieldInterface } from '../../../../types/forms';

export interface QualityGatesProps extends CreationFormFieldInterface {}

export interface AutotestWithBranchesOption {
    name: string;
    branches: string[];
    disabled?: boolean;
}

export interface QualityGate {
    id: number;
    qualityGateType: string;
    stepName: string;
    autotestName: string | null;
    branchName: string | null;
}
