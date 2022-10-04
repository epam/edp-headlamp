import { CreationFormFieldInterface } from '../../../../types/forms';

export interface QualityGatesProps extends CreationFormFieldInterface {
    namespace: string;
}

export interface QualityGate {
    id: number;
    qualityGateType: string;
    stepName: string;
    autotestName: string | null;
    branchName: string | null;
}

export interface Autotest {
    name: string;
    branches: string[];
}
