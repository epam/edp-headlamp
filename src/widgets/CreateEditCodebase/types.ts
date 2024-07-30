import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { FormMode } from '../../types/forms';

export interface CreateEditCodebaseDialogForwardedProps {
  mode: FormMode;
  codebaseData?: CodebaseKubeObjectInterface;
}

export interface CodebaseAuthData {
  repositoryLogin: string;
  repositoryPasswordOrApiToken: string;
}
