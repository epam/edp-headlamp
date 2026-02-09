import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { GitServerKubeObjectInterface } from '../../../k8s/groups/EDP/GitServer/types';
import { DialogProps } from '../../../providers/Dialog/types';
import { FormValues } from '../../../types/forms';
import { CODEBASE_FORM_NAMES } from './names';

export interface ManageCodebaseDialogProps
  extends DialogProps<{
    codebaseData?: CodebaseKubeObjectInterface;
    gitServers?: GitServerKubeObjectInterface[];
  }> {}

export interface CodebaseAuthData {
  repositoryLogin: string;
  repositoryPasswordOrApiToken: string;
}

export type ManageCodebaseFormValues = FormValues<typeof CODEBASE_FORM_NAMES>;
