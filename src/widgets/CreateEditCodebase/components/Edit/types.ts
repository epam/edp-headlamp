import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { FormValues } from '../../../../types/forms';
import { CODEBASE_FORM_NAMES } from '../../names';

export interface EditCodebaseFormDialogForwardedProps {
  codebaseData: EDPCodebaseKubeObjectInterface;
}

export type EditCodebaseFormValues = FormValues<typeof CODEBASE_FORM_NAMES>;
