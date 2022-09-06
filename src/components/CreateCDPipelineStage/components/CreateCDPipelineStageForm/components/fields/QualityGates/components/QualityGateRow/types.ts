import { Autotest, QualityGate } from '../../types';

export interface QualityGateRowProps {
    autotests: Autotest[];
    currentQualityGateData: QualityGate;
    setQualityGates(prev: any): QualityGate[];
    setNewQualityGates(prev: any): QualityGate[];
}
