import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';

export interface CodebaseBranchActionsProps {
  codebaseData: EDPCodebaseKubeObjectInterface;
  defaultBranch: string;
}
