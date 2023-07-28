import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FormMode } from '../../types/forms';

export interface CreateEditCodebaseDialogForwardedProps {
    mode: FormMode;
    codebaseData?: EDPCodebaseKubeObjectInterface;
}

export interface CodebaseAuthData {
    repositoryLogin: string;
    repositoryPasswordOrApiToken: string;
}
