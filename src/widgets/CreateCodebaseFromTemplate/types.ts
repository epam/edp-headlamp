import { EDPTemplateKubeObjectInterface } from '../../k8s/EDPTemplate/types';
import { FormData } from '../../types/forms';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from './names';

export type CreateCodebaseFromTemplateFormNames = FormData<
    typeof CODEBASE_FROM_TEMPLATE_FORM_NAMES
>;

export interface CreateCodebaseFromTemplateDialogForwardedProps {
    template: EDPTemplateKubeObjectInterface;
}
