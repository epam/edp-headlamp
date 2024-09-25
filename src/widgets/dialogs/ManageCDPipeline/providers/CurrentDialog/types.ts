import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { ManageCDPipelineDialogProps } from '../../types';

export interface CurrentDialogContextProviderProps extends ManageCDPipelineDialogProps {}

export interface CurrentDialogContextProviderValue extends CurrentDialogContextProviderProps {
  extra: {
    applications: CodebaseKubeObjectInterface[];
  };
}
