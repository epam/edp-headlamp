import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { FormValues } from '../../../../types/forms';
import { CODEBASE_FORM_NAMES } from '../../names';

export interface EditCodebaseFormDialogForwardedProps {
  codebaseData: CodebaseKubeObjectInterface;
}

export type EditCodebaseFormValues = FormValues<typeof CODEBASE_FORM_NAMES>;
