import { StageQualityGate } from '../../../../../../k8s/groups/EDP/Stage/schema';

export interface AutotestWithBranchesOption {
  name: string;
  branches: string[];
  disabled?: boolean;
}

export interface QualityGate extends StageQualityGate {
  id: number;
}
