import { StageSpecQualityGatesInterface } from '../../../../../k8s/groups/EDP/Stage/types';

export interface AutotestWithBranchesOption {
  name: string;
  branches: string[];
  disabled?: boolean;
}

export interface QualityGate extends StageSpecQualityGatesInterface {
  id: number;
}
