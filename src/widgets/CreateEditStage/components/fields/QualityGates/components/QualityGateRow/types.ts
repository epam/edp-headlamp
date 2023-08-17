import { AutotestWithBranchesOption, QualityGate } from '../../types';

export interface QualityGateRowProps {
    autotestsWithBranchesOptions: AutotestWithBranchesOption[];
    currentQualityGate: QualityGate;
}
