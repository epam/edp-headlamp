import { TemplateKubeObjectInterface } from '../../k8s/groups/EDP/Template/types';
import { FormValues } from '../../types/forms';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from './names';

export interface CreateCodebaseFromTemplateDialogForwardedProps {
  template: TemplateKubeObjectInterface;
}

export type CreateCodebaseFromTemplateFormValues = FormValues<
  typeof CODEBASE_FROM_TEMPLATE_FORM_NAMES
>;
