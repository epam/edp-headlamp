import { React } from '../../../../../../../../../plugin.globals';
import { Autotest, QualityGate } from '../../types';

export interface QualityGateRowProps {
    autotests: Autotest[];
    currentQualityGateData: QualityGate;
    setQualityGates: React.Dispatch<React.SetStateAction<QualityGate[]>>;
    setNewQualityGates: (newQualityGates: QualityGate[]) => void;
}
