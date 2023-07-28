import { EDPTemplateKubeObjectInterface } from '../../k8s/EDPTemplate/types';
import { FormValues } from '../../types/forms';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from './names';

export interface CreateCodebaseFromTemplateDialogForwardedProps {
    template: EDPTemplateKubeObjectInterface;
}

export type CreateCodebaseFromTemplateFormValues = FormValues<
    typeof CODEBASE_FROM_TEMPLATE_FORM_NAMES
>;
